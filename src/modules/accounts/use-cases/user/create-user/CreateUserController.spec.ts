import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm/";

let connection: Connection;

describe("Create User Controller", () => {
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

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to create a new user", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@rentx.com",
            password: "admin_test",
        });

        const { token } = responseToken.body;

        const user: ICreateUserDTO = {
            name: "User test",
            password: "12345",
            email: "user@test.com",
            driver_license: "ABC-123",
        };

        // Create a new user (test CreateUserController)
        const response = await request(app)
            .post("/users")
            .send(user)
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.name).toEqual(user.name);
        expect(response.body.email).toEqual(user.email);
    });
});
