import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { SpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";
import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm/";

let specificationsRepository: SpecificationsRepository;
let connection: Connection;

describe("List Specifications Controller", () => {
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

    it("Should be able to list all specifications created", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@rentx.com",
            password: "admin_test",
        });

        const { token } = responseToken.body;

        specificationsRepository = new SpecificationsRepository();

        await specificationsRepository.create({
            name: "Specification 1",
            description: "Specification 1 description",
        });

        await specificationsRepository.create({
            name: "Specification 2",
            description: "Specification 2 description",
        });

        // Get all specifications
        const response = await request(app)
            .get("/specifications")
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(response.status).toBe(200);
        expect(response.body[0].name).toEqual("Specification 1");
        expect(response.body[1].name).toEqual("Specification 2");
        expect(response.body.length).toBe(2);
    });
});
