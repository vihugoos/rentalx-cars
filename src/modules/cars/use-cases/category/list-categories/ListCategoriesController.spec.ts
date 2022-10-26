import request from "supertest";
import { Connection } from "typeorm";

import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm/";

let categoriesRepository: CategoriesRepository;
let connection: Connection;

describe("List Categories Controller", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.dropDatabase();
        await connection.runMigrations();
    });

    beforeEach(() => {
        categoriesRepository = new CategoriesRepository();
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to list all categories", async () => {
        await categoriesRepository.create({
            name: "Category 1",
            description: "Category 1 description",
        });

        await categoriesRepository.create({
            name: "Category 2",
            description: "Category 2 description",
        });

        // Get categories (test ListCategoriesController)
        const response = await request(app).get("/categories");

        expect(response.status).toBe(200);
        expect(response.body[0].name).toEqual("Category 1");
        expect(response.body[1].name).toEqual("Category 2");
        expect(response.body.length).toBe(2);
    });
});
