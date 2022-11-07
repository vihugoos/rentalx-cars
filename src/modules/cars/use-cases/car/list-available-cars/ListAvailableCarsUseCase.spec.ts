import { CarsRepositoryInMemory } from "@modules/cars/infra/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "@modules/cars/use-cases/car/create-car/CreateCarUseCase";
import { ListAvailableCarsUseCase } from "@modules/cars/use-cases/car/list-available-cars/ListAvailableCarsUseCase";
import { AppError } from "@shared/errors/AppError";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;

describe("List Available Cars Use Case", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(
            carsRepositoryInMemory
        );
    });

    it("Should be able to list all available cars", async () => {
        const car = await createCarUseCase.execute({
            name: "Car Test",
            description: "Car description",
            daily_rate: 10,
            license_plate: "ABC-123",
            fine_amount: 20,
            brand: "car_brand",
            category_id: "category_id",
        });

        const cars = await listAvailableCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    });

    it("Should be able to list all available cars by name", async () => {
        await createCarUseCase.execute({
            name: "Ferrari SF90 Spider",
            description: "Luxury sports",
            daily_rate: 800,
            license_plate: "GGGG-123",
            fine_amount: 3000,
            brand: "Ferrari",
            category_id: "category_id",
        });

        await createCarUseCase.execute({
            name: "Lamborghini Aventador",
            description: "Luxury sports",
            daily_rate: 600,
            license_plate: "FSC-2628",
            fine_amount: 2500,
            brand: "Lamborghini",
            category_id: "category_id",
        });

        const cars = await listAvailableCarsUseCase.execute({
            type_filter: "name",
            value: "Ferrari SF90 Spider",
        });

        expect(cars.length).toEqual(1);
    });

    it("Should be able to list all available cars by brand", async () => {
        await createCarUseCase.execute({
            name: "Aston Martin Vantage",
            description: "Luxury sports",
            daily_rate: 500,
            license_plate: "FSA-2486",
            fine_amount: 2990,
            brand: "Aston Martin",
            category_id: "category_id",
        });

        await createCarUseCase.execute({
            name: "BMW X6",
            description: "Luxury SUV",
            daily_rate: 250,
            license_plate: "FFF-5569",
            fine_amount: 1500,
            brand: "BMW",
            category_id: "category_id",
        });

        const cars = await listAvailableCarsUseCase.execute({
            type_filter: "brand",
            value: "BMW",
        });

        expect(cars.length).toEqual(1);
    });

    it("Should be able to list all available cars by category", async () => {
        await createCarUseCase.execute({
            name: "Ferrari 488 Spider",
            description: "Luxury sports",
            daily_rate: 900,
            license_plate: "FSW-2984",
            fine_amount: 4000,
            brand: "Ferrari",
            category_id: "18bae658-4af3-46bb-bd08-fc31f210da7b",
        });

        await createCarUseCase.execute({
            name: "Porsche Cayenne",
            description: "Luxury SUV",
            daily_rate: 300,
            license_plate: "XXX-1234",
            fine_amount: 5100,
            brand: "Porsche",
            category_id: "cb1485b0-9ecb-4f03-8e98-df9d458f5343",
        });

        const cars = await listAvailableCarsUseCase.execute({
            type_filter: "category_id",
            value: "18bae658-4af3-46bb-bd08-fc31f210da7b",
        });

        expect(cars.length).toEqual(1);
    });

    it("Should not be able to list cars", async () => {
        await expect(
            listAvailableCarsUseCase.execute({
                type_filter: "invalid_type_filter",
                value: "12345",
            })
        ).rejects.toEqual(new AppError("Invalid type filter!"));
    });
});
