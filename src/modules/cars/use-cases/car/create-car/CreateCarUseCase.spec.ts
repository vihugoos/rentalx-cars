import { CarsRepositoryInMemory } from "@modules/cars/infra/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car Use Case", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    });

    it("Should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "Name Car",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC-123",
            fine_amount: 60,
            brand: "Brand",
            category_id: "ID-123",
        });

        expect(car).toHaveProperty("id");
    });

    it("Should not be able to create a car with an existing license plate", () => {
        expect(async () => {
            await createCarUseCase.execute({
                name: "Car 1",
                description: "Description Car",
                daily_rate: 100,
                license_plate: "ABC-123",
                fine_amount: 60,
                brand: "Brand",
                category_id: "ID-123",
            });

            await createCarUseCase.execute({
                name: "Car 2",
                description: "Description Car",
                daily_rate: 100,
                license_plate: "ABC-123",
                fine_amount: 60,
                brand: "Brand",
                category_id: "ID-123",
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should be able to create a car with available true by default", async () => {
        const car = await createCarUseCase.execute({
            name: "Car Available",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ZZZ-999",
            fine_amount: 60,
            brand: "Brand",
            category_id: "ID-123",
        });

        expect(car.available).toBe(true);
    });
});
