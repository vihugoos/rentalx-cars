import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { AuthenticateUserUseCase } from "@modules/accounts/use-cases/user/authenticate-user/AuthenticateUserUseCase";
import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { DayjsDateProvider } from "@shared/container/providers/date-provider/implementations/DayjsDateProvider";
import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm/";

let usersRepository: UsersRepository;
let usersTokensRepository: UsersTokensRepository;
let dayjsDateProvider: DayjsDateProvider;
let authenticateUserUseCase: AuthenticateUserUseCase;
let categoriesRepository: CategoriesRepository;
let connection: Connection;

describe("Create Car Controller", () => {
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
        usersTokensRepository = new UsersTokensRepository();
        dayjsDateProvider = new DayjsDateProvider();
        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepository,
            usersTokensRepository,
            dayjsDateProvider
        );
        categoriesRepository = new CategoriesRepository();
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to create a new car", async () => {
        const { refresh_token } = await authenticateUserUseCase.execute({
            email: "admin@rentx.com",
            password: "admin_test",
        });

        const category = await categoriesRepository.create({
            name: "Category Test",
            description: "Category test description",
        });

        const car: ICreateCarDTO = {
            name: "Ferrari 488 Spider",
            description: "Luxury sports",
            daily_rate: 900,
            license_plate: "FSW-2984",
            fine_amount: 4000,
            brand: "Ferrari",
            category_id: category.id,
        };

        // Create a new car (test CreateCarController)
        const response = await request(app)
            .post("/cars")
            .send(car)
            .set({
                Authorization: `Bearer ${refresh_token}`,
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.name).toEqual(car.name);
        expect(response.body.description).toEqual(car.description);
    });
});
