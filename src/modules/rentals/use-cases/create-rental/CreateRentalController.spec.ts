import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { DayjsDateProvider } from "@shared/container/providers/date-provider/implementations/DayjsDateProvider";
import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm/";

let usersRepository: UsersRepository;
let categoriesRepository: CategoriesRepository;
let carsRepository: CarsRepository;
let dayjsDateProvider: DayjsDateProvider;
let connection: Connection;

describe("Create Rental Controller", () => {
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

    it("Should be able to create a new rental", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@rentx.com",
            password: "admin_test",
        });

        const { token } = responseToken.body;

        usersRepository = new UsersRepository();
        categoriesRepository = new CategoriesRepository();
        carsRepository = new CarsRepository();
        dayjsDateProvider = new DayjsDateProvider();

        const user = await usersRepository.findByEmail("admin@rentx.com");

        const category = await categoriesRepository.create({
            name: "Category Test",
            description: "Category test description",
        });

        const newCar: ICreateCarDTO = {
            name: "Ferrari 488 Spider",
            description: "Luxury sports",
            daily_rate: 900,
            license_plate: "FSW-2984",
            fine_amount: 4000,
            brand: "Ferrari",
            category_id: category.id,
        };

        const car = await carsRepository.create(newCar);

        const response = await request(app)
            .post("/rentals")
            .send({
                car_id: car.id,
                expected_return_date: dayjsDateProvider.todayAdd24Hours(),
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.user_id).toEqual(user.id);
        expect(response.body.car_id).toEqual(car.id);
    });
});
