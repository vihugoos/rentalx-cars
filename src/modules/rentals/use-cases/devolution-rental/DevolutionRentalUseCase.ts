import { inject, injectable } from "tsyringe";

import { ICar } from "@modules/cars/entities/ICar";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IRental } from "@modules/rentals/entities/IRental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/date-provider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

@injectable()
export class DevolutionRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,

        @inject("CarsRepository")
        private carsRepository: ICarsRepository,

        @inject("DateProvider")
        private dateProvider: IDateProvider
    ) {}

    async execute(rental_id: string): Promise<IRental> {
        const rental = await this.rentalsRepository.findById(rental_id);

        if (!rental) {
            throw new AppError("Rental does not exists!");
        }

        const car = await this.carsRepository.findById(rental.car_id);

        const daily = this.calculateAmountsOfDaily(rental.start_date);

        const delay = this.calculateDelay(rental.expected_return_date);

        const total = this.calculateTotalToPay(car, daily, delay);

        rental.end_date = this.dateProvider.dateNow();

        rental.total = total;

        await this.rentalsRepository.finishRental(rental);

        await this.carsRepository.updateAvailable(car.id, true);

        return rental;
    }

    private calculateAmountsOfDaily(start_date: Date): number {
        const MINIMUM_DAILY = 1;

        const dateNow = this.dateProvider.dateNow();

        let daily = this.dateProvider.diffInDays(dateNow, start_date);

        if (daily === 0) {
            daily = MINIMUM_DAILY;
        }

        return daily;
    }

    private calculateDelay(expected_return_date: Date): number {
        const dateNow = this.dateProvider.dateNow();

        const delay = this.dateProvider.diffInDays(
            dateNow,
            expected_return_date
        );

        return delay;
    }

    private calculateTotalToPay(
        car: ICar,
        daily: number,
        delay: number
    ): number {
        let total = 0;

        if (delay > 0) {
            total = delay * car.fine_amount;
        }

        total += daily * car.daily_rate;

        return total;
    }
}
