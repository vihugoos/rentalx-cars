import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm/";

let connection: Connection;

describe("Authenticate User Controller", () => {
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

    it("Should be able to authenticate an user", async () => {
        const response = await request(app).post("/sessions").send({
            email: "admin@rentx.com",
            password: "admin_test",
        });

        expect(response.status).toBe(200);
        expect(response.body.token).toBeTruthy();
        expect(response.body.user.name).toEqual("admin_test");
        expect(response.body.user.email).toEqual("admin@rentx.com");
    });
});
