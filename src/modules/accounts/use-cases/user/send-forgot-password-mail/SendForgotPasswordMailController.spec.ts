import request from "supertest";
import { Connection } from "typeorm";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { CreateUserUseCase } from "@modules/accounts/use-cases/user/create-user/CreateUserUseCase";
import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm/";

let usersRepository: UsersRepository;
let createUserUseCase: CreateUserUseCase;
let connection: Connection;

describe("Send Forgot Password Mail Controller", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.dropDatabase();
        await connection.runMigrations();
    });

    beforeEach(() => {
        usersRepository = new UsersRepository();
        createUserUseCase = new CreateUserUseCase(usersRepository);
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to send a forgot password mail to the user", async () => {
        const user = await createUserUseCase.execute({
            name: "User test",
            password: "12345",
            email: "user@test.com",
            driver_license: "ABC-123",
        });

        // Send Forgot Password Mail Controller (test SendForgotPasswordMailController)
        const response = await request(app)
            .post("/password/forgot")
            .send({ email: user.email });

        expect(response.status).toBe(200);
    });
});
