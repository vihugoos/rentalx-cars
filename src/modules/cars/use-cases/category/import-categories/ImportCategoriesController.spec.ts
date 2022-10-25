import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { ListCategoriesUseCase } from "@modules/cars/use-cases/category/list-categories/ListCategoriesUseCase";
import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm/";

let categoriesRepository: CategoriesRepository;
let listCategoriesUseCase: ListCategoriesUseCase;
let connection: Connection;

const categories_csv_path = `${__dirname}/categories-test.csv`;

describe("Import Categories Controller", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.dropDatabase();
        await connection.dropDatabase(); // just to make sure it's clean.
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

    it("Should be able to import categories from CSV", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@rentx.com",
            password: "admin_test",
        });

        const { token } = responseToken.body;

        const response = await request(app)
            .post("/categories/import")
            .attach("file", categories_csv_path)
            .set({
                Authorization: `Bearer ${token}`,
            });

        categoriesRepository = new CategoriesRepository();
        listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository);

        const listCategories = await listCategoriesUseCase.execute();

        expect(response.status).toBe(204);
        expect(listCategories[0].name).toEqual("SUV");
    });
});
