import request from "supertest";
import { Connection } from "typeorm";

import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm/";

let categoriesRepository: CategoriesRepository;
let carsRepository: CarsRepository;
let connection: Connection;

describe("List Available Cars Controller", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.dropDatabase();
        await connection.runMigrations();
    });

    beforeEach(() => {
        categoriesRepository = new CategoriesRepository();
        carsRepository = new CarsRepository();
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to list available cars", async () => {
        const category = await categoriesRepository.create({
            name: "Category Test",
            description: "Category test description",
        });

        await carsRepository.create({
            name: "Lamborghini Aventador",
            description: "Luxury sports",
            daily_rate: 600,
            license_plate: "FSC-2628",
            fine_amount: 3500,
            brand: "Lamborghini",
            category_id: category.id,
        });

        const car = await carsRepository.create({
            name: "Ferrari 488 Spider",
            description: "Luxury sports",
            daily_rate: 900,
            license_plate: "FSW-2984",
            fine_amount: 4000,
            brand: "Ferrari",
            category_id: category.id,
        });

        // Get available cars (test ListAvailableCarsController)
        const response = await request(app).get("/cars/available");

        expect(response.status).toBe(200);
        expect(response.body[1].name).toEqual(car.name);
        expect(response.body[1].available).toBeTruthy();
        expect(response.body.length).toBe(2);
    });
});
