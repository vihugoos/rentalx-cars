import request from "supertest";
import { Connection } from "typeorm";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm/";
import { deleteFile } from "@utils/delete-file";

import { CreateUserUseCase } from "../create-user/CreateUserUseCase";

let usersRepository: UsersRepository;
let createUserUseCase: CreateUserUseCase;
let connection: Connection;

const avatar_image_path = `${__dirname}/avatar-image-test.jpg`;

describe("Update User Avatar Controller", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.dropDatabase();
        await connection.runMigrations();
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to update an user avatar", async () => {
        usersRepository = new UsersRepository();
        createUserUseCase = new CreateUserUseCase(usersRepository);

        const user: ICreateUserDTO = {
            name: "User test",
            password: "12345",
            email: "user@test.com",
            driver_license: "ABC-123",
        };

        await createUserUseCase.execute(user);

        const responseToken = await request(app).post("/sessions").send({
            email: user.email,
            password: user.password,
        });

        const { token } = responseToken.body;

        const response = await request(app)
            .patch("/users/avatar")
            .attach("avatar", avatar_image_path)
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(response.status).toBe(204);

        const userWithAvatar = await usersRepository.findByEmail(user.email);

        await deleteFile(`./tmp/avatar/${userWithAvatar.avatar}`);
    });
});
