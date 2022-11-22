import request from "supertest";
import { Connection } from "typeorm";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { AuthenticateUserUseCase } from "@modules/accounts/use-cases/user/authenticate-user/AuthenticateUserUseCase";
import { CreateUserUseCase } from "@modules/accounts/use-cases/user/create-user/CreateUserUseCase";
import { DayjsDateProvider } from "@shared/container/providers/date-provider/implementations/DayjsDateProvider";
import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm/";
import { deleteFile } from "@utils/delete-file";

let usersRepository: UsersRepository;
let usersTokensRepository: UsersTokensRepository;
let dayjsDateProvider: DayjsDateProvider;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let connection: Connection;

const avatar_image_path = `${__dirname}/avatar-user-test.jpg`;

describe("User Profile Controller", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.dropDatabase();
        await connection.runMigrations();
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

    it("Should be able to get user profile", async () => {
        const user: ICreateUserDTO = {
            name: "User test",
            password: "12345",
            email: "user@test.com",
            driver_license: "ABC-123",
        };

        await createUserUseCase.execute(user);

        const { token } = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });

        // Upload an avatar image
        await request(app)
            .patch("/users/avatar")
            .attach("avatar", avatar_image_path)
            .set({
                Authorization: `Bearer ${token}`,
            });

        // User Profile Controller (test UserProfileController)
        const response = await request(app)
            .get("/users/profile")
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(response.status).toBe(200);
        expect(response.body.email).toEqual(user.email);
        expect(response.body).not.toHaveProperty("password");
        expect(response.body.avatar).toContain("avatar-user-test.jpg");
        expect(response.body.avatar_url).toContain("http://localhost:3333");
        expect(response.body.avatar_url).toContain("avatar-user-test.jpg");

        await deleteFile(`./tmp/avatar/${response.body.avatar}`);
    });
});
