import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm/";

let categoriesRepository: CategoriesRepository;
let connection: Connection;

describe("List Available Cars Controller", () => {
    beforeAll(async () => {
        connection = await createConnection();
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

    it("Should be able to list available cars", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@rentx.com",
            password: "admin_test",
        });

        const { token } = responseToken.body;

        categoriesRepository = new CategoriesRepository();

        const category = await categoriesRepository.create({
            name: "Category Test",
            description: "Category test description",
        });

        const car_1: ICreateCarDTO = {
            name: "Ferrari 488 Spider",
            description: "Luxury sports",
            daily_rate: 900,
            license_plate: "FSW-2984",
            fine_amount: 4000,
            brand: "Ferrari",
            category_id: category.id,
        };

        const car_2: ICreateCarDTO = {
            name: "Lamborghini Aventador",
            description: "Luxury sports",
            daily_rate: 600,
            license_plate: "FSC-2628",
            fine_amount: 3500,
            brand: "Lamborghini",
            category_id: category.id,
        };

        // Create Car 1
        await request(app)
            .post("/cars")
            .send(car_1)
            .set({
                Authorization: `Bearer ${token}`,
            });

        // Create Car 2
        await request(app)
            .post("/cars")
            .send(car_2)
            .set({
                Authorization: `Bearer ${token}`,
            });

        const response = await request(app).get("/cars/available");

        expect(response.status).toBe(200);
        expect(response.body[0].name).toEqual(car_1.name);
        expect(response.body[0].available).toBeTruthy();
        expect(response.body.length).toBe(2);
    });
});
