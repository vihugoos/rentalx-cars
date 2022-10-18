import { CarsRepositoryInMemory } from "@modules/cars/infra/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/infra/in-memory/SpecificationsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Create car specification", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationsRepositoryInMemory =
            new SpecificationsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
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

        const specification = await specificationsRepositoryInMemory.create({
            name: "Description Test",
            description: "Description Test",
        });

        const specificationsCars = await createCarSpecificationUseCase.execute({
            car_id: car.id,
            specifications_id: [specification.id],
        });

        expect(specificationsCars).toHaveProperty("specifications");
        expect(specificationsCars.specifications.length).toBe(1);
    });

    it("Should not be able to add a new specification to a non-existent car ", async () => {
        expect(async () => {
            await createCarSpecificationUseCase.execute({
                car_id: "car_id_error",
                specifications_id: [],
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
