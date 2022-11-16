import { compare } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";

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

describe("Reset Password User Controller", () => {
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

    it("Should be able to reset the user's password", async () => {
        await createUserUseCase.execute({
            name: "User test",
            password: "12345",
            email: "user@test.com",
            driver_license: "ABC-123",
        });

        const { refresh_token } = await authenticateUserUseCase.execute({
            email: "user@test.com",
            password: "12345",
        });

        // Reset Password User Controller (test ResetPasswordUserController)
        const response = await request(app)
            .post(`/password/reset?token=${refresh_token}`)
            .send({ password: "new_user_password" });

        const user = await usersRepository.findByEmail("user@test.com");

        const passwordMatch = await compare("new_user_password", user.password);

        expect(response.status).toBe(200);
        expect(passwordMatch).toBe(true);
    });
});
