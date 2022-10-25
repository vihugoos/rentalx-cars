import request from "supertest";
import { Connection } from "typeorm";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AuthenticateUserUseCase } from "@modules/accounts/use-cases/user/authenticate-user/AuthenticateUserUseCase";
import { CreateUserUseCase } from "@modules/accounts/use-cases/user/create-user/CreateUserUseCase";
import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm/";
import { deleteFile } from "@utils/delete-file";

let usersRepository: UsersRepository;
let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;
let connection: Connection;

const avatar_image_path = `${__dirname}/avatar-image-test.jpg`;

describe("Update User Avatar Controller", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.dropDatabase();
        await connection.runMigrations();
    });

    beforeEach(() => {
        usersRepository = new UsersRepository();
        createUserUseCase = new CreateUserUseCase(usersRepository);
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to update an user avatar", async () => {
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

        // Update user avatar (test UpdateUserAvatarController)
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
