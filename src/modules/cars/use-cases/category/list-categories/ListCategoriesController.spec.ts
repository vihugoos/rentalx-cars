import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm/";

let connection: Connection;

describe("List Categories Controller", () => {
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

    it("Should be able to list all categories", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@rentx.com",
            password: "admin_test",
        });

        const { token } = responseToken.body;

        // Create Category 1
        await request(app)
            .post("/categories")
            .send({
                name: "Category 1",
                description: "Category 1",
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        // Create Category 2
        await request(app)
            .post("/categories")
            .send({
                name: "Category 2",
                description: "Category 2",
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        // Get categories
        const response = await request(app).get("/categories");

        expect(response.status).toBe(200);
        expect(response.body[0].name).toEqual("Category 1");
        expect(response.body[1].name).toEqual("Category 2");
        expect(response.body.length).toBe(2);
    });
});
