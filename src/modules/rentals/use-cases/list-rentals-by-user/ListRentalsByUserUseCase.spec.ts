import { UsersRepositoryInMemory } from "@modules/accounts/infra/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "@modules/accounts/use-cases/user/create-user/CreateUserUseCase";
import { CarsRepositoryInMemory } from "@modules/cars/infra/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/infra/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "@modules/rentals/use-cases/create-rental/CreateRentalUseCase";
import { DayjsDateProvider } from "@shared/container/providers/date-provider/implementations/DayjsDateProvider";

import { ListRentalsByUserUseCase } from "./ListRentalsByUserUseCase";

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let createRentalUseCase: CreateRentalUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let listRentalsByUserUseCase: ListRentalsByUserUseCase;

describe("List Rentals By User Use Case", () => {
    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory,
            carsRepositoryInMemory,
            dayjsDateProvider
        );
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
        listRentalsByUserUseCase = new ListRentalsByUserUseCase(
            rentalsRepositoryInMemory
        );
    });

    it("Should be able to list all rentals by user", async () => {
        const user = await createUserUseCase.execute({
            name: "Alexander Baker",
            password: "12345",
            email: "ohom@ditdu.pm",
            driver_license: "ABC-123",
        });

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
            user_id: user.id,
            car_id: car.id,
            expected_return_date: dayjsDateProvider.todayAdd24Hours(),
        });

        const listRentals = await listRentalsByUserUseCase.execute(user.id);

        expect(listRentals).toEqual([rental]);
        expect(listRentals[0].user_id).toEqual(user.id);
    });
});
