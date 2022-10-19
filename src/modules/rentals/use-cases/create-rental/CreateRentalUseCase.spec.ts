import { RentalsRepositoryInMemory } from "@modules/rentals/infra/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/date-provider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory,
            dayjsDateProvider
        );
    });

    it("Should be able to create a new rental", async () => {
        const rental = await createRentalUseCase.execute({
            user_id: "bb5fa9dc-c103-4aa4-a18a-26d000509dad",
            car_id: "2ceda80c-d942-4979-abb1-8857c24b6da2",
            expected_return_date: dayjsDateProvider.todayAdd24Hours(),
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("Should not be able to create a new rental if there is another open to the same car", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "a501b417-982f-455f-b257-3a1586fb59a2",
                car_id: "car_id",
                expected_return_date: dayjsDateProvider.todayAdd24Hours(),
            });

            await createRentalUseCase.execute({
                user_id: "d68900b7-741f-429a-9127-bb975a3ae36e",
                car_id: "car_id",
                expected_return_date: dayjsDateProvider.todayAdd24Hours(),
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should not be able to create a new rental if there is another open to the same user", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "user_id",
                car_id: "3462d107-b147-44b8-94f1-d06db80bbf77",
                expected_return_date: dayjsDateProvider.todayAdd24Hours(),
            });

            await createRentalUseCase.execute({
                user_id: "user_id",
                car_id: "c65aa733-cf62-45da-8b20-319f42eded1f",
                expected_return_date: dayjsDateProvider.todayAdd24Hours(),
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should not be able to create a new rental with an invalid turnaround time.", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "a501b417-982f-455f-b257-3a1586fb59a2",
                car_id: "3462d107-b147-44b8-94f1-d06db80bbf77",
                expected_return_date: dayjsDateProvider.dateNow(),
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
