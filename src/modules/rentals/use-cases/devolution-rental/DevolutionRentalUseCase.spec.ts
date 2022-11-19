import { CarsRepositoryInMemory } from "@modules/cars/infra/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/infra/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "@modules/rentals/use-cases/create-rental/CreateRentalUseCase";
import { DayjsDateProvider } from "@shared/container/providers/date-provider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { DevolutionRentalUseCase } from "./DevolutionRentalUseCase";

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;
let devolutionRentalUseCase: DevolutionRentalUseCase;
let dayjsDateProvider: DayjsDateProvider;

describe("Devolution Rental Use Case", () => {
    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory,
            carsRepositoryInMemory,
            dayjsDateProvider
        );
        devolutionRentalUseCase = new DevolutionRentalUseCase(
            rentalsRepositoryInMemory,
            carsRepositoryInMemory,
            dayjsDateProvider
        );
    });

    it("Should be able to return a rental", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car Test",
            description: "Car test description",
            daily_rate: 900,
            license_plate: "ABC-2984",
            fine_amount: 250,
            brand: "JTest",
            category_id: "1234",
        });

        const rental = await createRentalUseCase.execute({
            user_id: "bb5fa9dc-c103-4aa4-a18a-26d000509dad",
            car_id: car.id,
            expected_return_date: dayjsDateProvider.todayAdd24Hours(),
        });

        await devolutionRentalUseCase.execute(rental.id);

        const checkRental = await rentalsRepositoryInMemory.findById(rental.id);

        const checkCar = await carsRepositoryInMemory.findById(car.id);

        expect(checkRental.end_date).toBeTruthy();
        expect(checkRental.total).toBe(900);
        expect(checkCar.available).toBe(true);
    });

    it("Should not be able to return a non-existent rental", async () => {
        await expect(
            devolutionRentalUseCase.execute("invalid_rental_id")
        ).rejects.toEqual(new AppError("Rental does not exists!"));
    });

    it("Should be able to return a rental delayed", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car Test 2",
            description: "Car test 2 description",
            daily_rate: 100,
            license_plate: "ABC-2984",
            fine_amount: 150,
            brand: "JTest",
            category_id: "1234",
        });

        // Create a rental already delayed (3 days)
        const rental = await rentalsRepositoryInMemory.create({
            user_id: "bb5fa9dc-c103-4aa4-a18a-26d000509dad",
            car_id: car.id,
            expected_return_date: dayjsDateProvider.addDays(-3),
        });

        await devolutionRentalUseCase.execute(rental.id);

        const checkRental = await rentalsRepositoryInMemory.findById(rental.id);

        // Total amount including the 3 days delay
        expect(checkRental.total).toBe(550);
    });
});
