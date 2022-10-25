import request from "supertest";
import { Connection } from "typeorm";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { CreateUserUseCase } from "@modules/accounts/use-cases/user/create-user/CreateUserUseCase";
import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm/";

let usersRepository: UsersRepository;
let createUserUseCase: CreateUserUseCase;
let connection: Connection;

describe("Authenticate User Controller", () => {
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

    it("Should be able to authenticate an user", async () => {
        const user: ICreateUserDTO = {
            name: "User test",
            password: "12345",
            email: "user@test.com",
            driver_license: "ABC-123",
        };

        await createUserUseCase.execute(user);

        // Authenticate user (test AuthenticateUserController)
        const response = await request(app).post("/sessions").send({
            email: user.email,
            password: user.password,
        });

        expect(response.status).toBe(200);
        expect(response.body.token).toBeTruthy();
        expect(response.body.user.name).toEqual(user.name);
        expect(response.body.user.email).toEqual(user.email);
    });
});
