import request from "supertest";
import { Connection } from "typeorm";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { AuthenticateUserUseCase } from "@modules/accounts/use-cases/user/authenticate-user/AuthenticateUserUseCase";
import { CreateUserUseCase } from "@modules/accounts/use-cases/user/create-user/CreateUserUseCase";
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { RentalsRepository } from "@modules/rentals/infra/typeorm/repositories/RentalsRepository";
import { CreateRentalUseCase } from "@modules/rentals/use-cases/create-rental/CreateRentalUseCase";
import { DayjsDateProvider } from "@shared/container/providers/date-provider/implementations/DayjsDateProvider";
import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm/";

let usersRepository: UsersRepository;
let usersTokensRepository: UsersTokensRepository;
let dayjsDateProvider: DayjsDateProvider;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let categoriesRepository: CategoriesRepository;
let carsRepository: CarsRepository;
let rentalsRepository: RentalsRepository;
let createRentalUseCase: CreateRentalUseCase;
let connection: Connection;

describe("Devolution Rental Controller", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.dropDatabase();
        await connection.runMigrations();
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
        createUserUseCase = new CreateUserUseCase(usersRepository);
        categoriesRepository = new CategoriesRepository();
        carsRepository = new CarsRepository();
        rentalsRepository = new RentalsRepository();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepository,
            carsRepository,
            dayjsDateProvider
        );
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to return a rental", async () => {
        const newUser: ICreateUserDTO = {
            name: "User test",
            password: "12345",
            email: "user@test.com",
            driver_license: "ABC-123",
        };

        const user = await createUserUseCase.execute(newUser);

        const { token } = await authenticateUserUseCase.execute({
            email: newUser.email,
            password: newUser.password,
        });

        const category = await categoriesRepository.create({
            name: "Category Test",
            description: "Category test description",
        });

        const car = await carsRepository.create({
            name: "Lamborghini Aventador",
            description: "Luxury sports",
            daily_rate: 900,
            license_plate: "XXXX-2984",
            fine_amount: 4000,
            brand: "Ferrari",
            category_id: category.id,
        });

        const rental = await createRentalUseCase.execute({
            user_id: user.id,
            car_id: car.id,
            expected_return_date: dayjsDateProvider.todayAdd24Hours(),
        });

        // Devolution a rental (test DevolutionRentalController)
        const response = await request(app)
            .post(`/rentals/devolution/${rental.id}`)
            .set({
                Authorization: `Bearer ${token}`,
            });

        const updatedCar = await carsRepository.findById(car.id);

        expect(response.status).toBe(200);
        expect(response.body.end_date).toBeTruthy();
        expect(response.body.total).toEqual(900);
        expect(updatedCar.available).toBe(true);
    });
});
