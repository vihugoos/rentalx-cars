import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { AuthenticateUserUseCase } from "@modules/accounts/use-cases/user/authenticate-user/AuthenticateUserUseCase";
import { CreateUserUseCase } from "@modules/accounts/use-cases/user/create-user/CreateUserUseCase";
import { DayjsDateProvider } from "@shared/container/providers/date-provider/implementations/DayjsDateProvider";
import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm/";

let usersRepository: UsersRepository;
let usersTokensRepository: UsersTokensRepository;
let dayjsDateProvider: DayjsDateProvider;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let connection: Connection;

describe("List Users Controller", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.dropDatabase();
        await connection.runMigrations();

        const id = uuidV4();
        const password = await hash("admin_test", 8);

        await connection.query(
            `INSERT INTO USERS(id, name, email, password, driver_license, "admin", created_at)
                values('${id}', 'admin_test', 'admin@rentx.com', '${password}', 'XXX-XXX', true, 'now()')
            `
        );
    });

    beforeEach(() => {
        usersRepository = new UsersRepository();
        usersTokensRepository = new UsersTokensRepository();
        dayjsDateProvider = new DayjsDateProvider();
        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepository,
            usersTokensRepository,
            dayjsDateProvider
        );
        createUserUseCase = new CreateUserUseCase(usersRepository);
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to get all users", async () => {
        const { refresh_token } = await authenticateUserUseCase.execute({
            email: "admin@rentx.com",
            password: "admin_test",
        });

        await createUserUseCase.execute({
            name: "User test 1",
            password: "12345",
            email: "email@test.com",
            driver_license: "ABC-123",
        });

        await createUserUseCase.execute({
            name: "User test 2",
            password: "99999",
            email: "usertest@test.com",
            driver_license: "FFX-187",
        });

        // Get all users (test ListUsersController)
        const response = await request(app)
            .get("/users")
            .set({
                Authorization: `Bearer ${refresh_token}`,
            });

        expect(response.status).toBe(200);
        expect(response.body[0].name).toEqual("admin_test");
        expect(response.body[1].name).toEqual("User test 1");
        expect(response.body.length).toBe(3);
    });
});
