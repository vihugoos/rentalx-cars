import { CarsRepositoryInMemory } from "@modules/cars/infra/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "@modules/cars/use-cases/car/create-car/CreateCarUseCase";

import { ListAllCarsUseCase } from "./ListAllCarsUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;
let listAllCarsUseCase: ListAllCarsUseCase;

describe("List All Cars Use Case", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
        listAllCarsUseCase = new ListAllCarsUseCase(carsRepositoryInMemory);
    });

    it("Should be able to list all cars", async () => {
        await createCarUseCase.execute({
            name: "Car 1",
            description: "Description Car 2",
            daily_rate: 80,
            license_plate: "ABC-123",
            fine_amount: 200,
            brand: "Brand",
            category_id: "ID-123",
        });

        await createCarUseCase.execute({
            name: "Car 2",
            description: "Description Car 2",
            daily_rate: 200,
            license_plate: "FFF-9999",
            fine_amount: 300,
            brand: "Brand",
            category_id: "ID-123",
        });

        const listCars = await listAllCarsUseCase.execute();

        expect(listCars.length).toBe(2);
        expect(listCars[0].name).toEqual("Car 1");
        expect(listCars[1].name).toEqual("Car 2");
    });
});
