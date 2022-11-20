import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { AuthenticateUserUseCase } from "@modules/accounts/use-cases/user/authenticate-user/AuthenticateUserUseCase";
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";
import { DayjsDateProvider } from "@shared/container/providers/date-provider/implementations/DayjsDateProvider";
import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm/";

let usersRepository: UsersRepository;
let usersTokensRepository: UsersTokensRepository;
let dayjsDateProvider: DayjsDateProvider;
let authenticateUserUseCase: AuthenticateUserUseCase;
let categoriesRepository: CategoriesRepository;
let carsRepository: CarsRepository;
let specificationsRepository: SpecificationsRepository;
let connection: Connection;

describe("Create Car Specifications Controller", () => {
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
        carsRepository = new CarsRepository();
        specificationsRepository = new SpecificationsRepository();
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to add a new specifications to the car", async () => {
        const { token } = await authenticateUserUseCase.execute({
            email: "admin@rentx.com",
            password: "admin_test",
        });

        const category = await categoriesRepository.create({
            name: "Category Test",
            description: "Category test description",
        });

        const car = await carsRepository.create({
            name: "Porsche Cayenne",
            description: "Luxury SUV",
            daily_rate: 300,
            license_plate: "XXX-1234",
            fine_amount: 5100,
            brand: "Porsche",
            category_id: category.id,
        });

        const specification_1 = await specificationsRepository.create({
            name: "Specification 1",
            description: "Specifications 1",
        });

        const specification_2 = await specificationsRepository.create({
            name: "Specification 2",
            description: "Specifications 2",
        });

        // Add a new specifications to the car (test CreateCarSpecificationsController)
        const response = await request(app)
            .post(`/cars/specifications/${car.id}`)
            .send({
                list_specifications_ids: [
                    specification_1.id,
                    specification_2.id,
                ],
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(response.status).toBe(201);
        expect(response.body.name).toEqual(car.name);
        expect(response.body.specifications.length).toBe(2);
        expect(response.body.specifications[0].name).toEqual(
            specification_1.name
        );
    });
});
