import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm/";

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

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to list all registered users", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@rentx.com",
            password: "admin_test",
        });

        const { token } = responseToken.body;

        // Create User 1
        await request(app)
            .post("/users")
            .send({
                name: "User test 1",
                password: "12345",
                email: "email@test.com",
                driver_license: "ABC-123",
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        // Create User 2
        await request(app)
            .post("/users")
            .send({
                name: "User test 2",
                password: "99999",
                email: "usertest@test.com",
                driver_license: "FFX-187",
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        // Get all users
        const response = await request(app)
            .get("/users")
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(response.status).toBe(200);
        expect(response.body[0].name).toEqual("admin_test");
        expect(response.body[1].name).toEqual("User test 1");
        expect(response.body.length).toBe(3);
    });
});
