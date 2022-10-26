import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AuthenticateUserUseCase } from "@modules/accounts/use-cases/user/authenticate-user/AuthenticateUserUseCase";
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm/";

let usersRepository: UsersRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;
let categoriesRepository: CategoriesRepository;
let connection: Connection;

const categories_csv_path = `${__dirname}/categories-test.csv`;

describe("Import Categories Controller", () => {
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
        categoriesRepository = new CategoriesRepository();
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to import categories from CSV", async () => {
        const { token } = await authenticateUserUseCase.execute({
            email: "admin@rentx.com",
            password: "admin_test",
        });

        // Import categories (test ImportCategoriesController)
        const response = await request(app)
            .post("/categories/import")
            .attach("file", categories_csv_path)
            .set({
                Authorization: `Bearer ${token}`,
            });

        const listCategories = await categoriesRepository.list();

        expect(response.status).toBe(204);
        expect(listCategories[0].name).toEqual("SUV");
        expect(listCategories[0].description).toEqual("Sports Utility");
    });
});
