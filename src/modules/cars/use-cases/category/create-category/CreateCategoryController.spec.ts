import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AuthenticateUserUseCase } from "@modules/accounts/use-cases/user/authenticate-user/AuthenticateUserUseCase";
import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm/";

let usersRepository: UsersRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;
let connection: Connection;

describe("Create Category Controller", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.dropDatabase();
        await connection.runMigrations();

        const id = uuidV4();
        const password = await hash("admin_test", 8);

        await connection.query(
            ` INSERT INTO USERS(id, name, email, password, driver_license, "admin", created_at)
                values('${id}', 'admin_test', 'admin@rentx.com', '${password}', 'XXX-XXX', true, 'now()')
            `
        );
    });

    beforeEach(() => {
        usersRepository = new UsersRepository();
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to create a new category", async () => {
        const { token } = await authenticateUserUseCase.execute({
            email: "admin@rentx.com",
            password: "admin_test",
        });

        // Create a new category (test CreateCategoryController)
        const response = await request(app)
            .post("/categories")
            .send({
                name: "Category Test",
                description: "Category test description",
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.name).toEqual("Category Test");
        expect(response.body.description).toEqual("Category test description");
    });
});
