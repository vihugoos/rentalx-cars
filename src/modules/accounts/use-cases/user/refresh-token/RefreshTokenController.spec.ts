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

describe("Refresh Token Controller", () => {
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

    it("Should be able to refresh the refresh_token", async () => {
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

        // Refresh Token Controller (test RefreshTokenController)
        const response = await request(app)
            .post("/refresh-token")
            .send({ token: refresh_token });

        expect(response.status).toBe(200);
        expect(response.body.refresh_token).toBeTruthy();
    });
});
