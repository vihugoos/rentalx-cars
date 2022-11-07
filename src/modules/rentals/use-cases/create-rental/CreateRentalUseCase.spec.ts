import { CarsRepositoryInMemory } from "@modules/cars/infra/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/infra/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/date-provider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental Use Case", () => {
    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory,
            carsRepositoryInMemory,
            dayjsDateProvider
        );
    });

    it("Should be able to create a new rental", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car Test",
            description: "Car test description",
            daily_rate: 900,
            license_plate: "ABC-2984",
            fine_amount: 4000,
            brand: "JTest",
            category_id: "1234",
        });

        const rental = await createRentalUseCase.execute({
            user_id: "bb5fa9dc-c103-4aa4-a18a-26d000509dad",
            car_id: car.id,
            expected_return_date: dayjsDateProvider.todayAdd24Hours(),
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("Should not be able to create a new rental if there is another open to the same car", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car Test",
            description: "Car test description",
            daily_rate: 900,
            license_plate: "ABC-2984",
            fine_amount: 4000,
            brand: "JTest",
            category_id: "1234",
        });

        await createRentalUseCase.execute({
            user_id: "a501b417-982f-455f-b257-3a1586fb59a2",
            car_id: car.id,
            expected_return_date: dayjsDateProvider.todayAdd24Hours(),
        });

        await expect(
            createRentalUseCase.execute({
                user_id: "d68900b7-741f-429a-9127-bb975a3ae36e",
                car_id: car.id,
                expected_return_date: dayjsDateProvider.todayAdd24Hours(),
            })
        ).rejects.toEqual(new AppError("This car is already rented!"));
    });

    it("Should not be able to create a new rental if there is another open to the same user", async () => {
        const car_1 = await carsRepositoryInMemory.create({
            name: "Car 1",
            description: "Car 1 description",
            daily_rate: 900,
            license_plate: "ABC-2984",
            fine_amount: 4000,
            brand: "AAA",
            category_id: "1234",
        });

        const car_2 = await carsRepositoryInMemory.create({
            name: "Car 2",
            description: "Car 2 description",
            daily_rate: 500,
            license_plate: "FFF-3232",
            fine_amount: 1250,
            brand: "BBB",
            category_id: "9999",
        });

        await createRentalUseCase.execute({
            user_id: "user_id",
            car_id: car_1.id,
            expected_return_date: dayjsDateProvider.todayAdd24Hours(),
        });

        await expect(
            createRentalUseCase.execute({
                user_id: "user_id",
                car_id: car_2.id,
                expected_return_date: dayjsDateProvider.todayAdd24Hours(),
            })
        ).rejects.toEqual(
            new AppError("There's a rental in progress for user!")
        );
    });

    it("Should not be able to create a new rental with an invalid turnaround time.", async () => {
        await expect(
            createRentalUseCase.execute({
                user_id: "a501b417-982f-455f-b257-3a1586fb59a2",
                car_id: "3462d107-b147-44b8-94f1-d06db80bbf77",
                expected_return_date: dayjsDateProvider.dateNow(),
            })
        ).rejects.toEqual(
            new AppError("Expected return date less than 24 hours!")
        );
    });
});
