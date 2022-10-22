import { CarsRepositoryInMemory } from "@modules/cars/infra/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/infra/in-memory/SpecificationsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationsUseCase } from "./CreateCarSpecificationsUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;
let createCarSpecificationsUseCase: CreateCarSpecificationsUseCase;

describe("Create Car Specification Use Case", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationsRepositoryInMemory =
            new SpecificationsRepositoryInMemory();
        createCarSpecificationsUseCase = new CreateCarSpecificationsUseCase(
            carsRepositoryInMemory,
            specificationsRepositoryInMemory
        );
    });

    it("Should be able to add a new specification to the car", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Name Car",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC-123",
            fine_amount: 60,
            brand: "Brand",
            category_id: "ID-123",
        });

        const specification_1 = await specificationsRepositoryInMemory.create({
            name: "Test 1",
            description: "Description Test 1",
        });

        const specification_2 = await specificationsRepositoryInMemory.create({
            name: "Test 2",
            description: "Description Test 2",
        });

        const specificationsCars = await createCarSpecificationsUseCase.execute(
            {
                car_id: car.id,
                list_specifications_ids: [
                    specification_1.id,
                    specification_2.id,
                ],
            }
        );

        expect(specificationsCars.specifications).toBeTruthy();
        expect(specificationsCars.specifications.length).toBe(2);
        expect(specificationsCars.specifications[0].name).toEqual("Test 1");
    });

    it("Should not be able to add a new specification to a non-existent car ", async () => {
        expect(async () => {
            await createCarSpecificationsUseCase.execute({
                car_id: "car_id_error",
                list_specifications_ids: [],
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
