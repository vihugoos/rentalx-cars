import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IRental } from "@modules/rentals/entities/IRental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/date-provider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    rental_id: string;
    user_id: string;
}

@injectable()
class DevolutionRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,

        @inject("CarsRepository")
        private carsRepository: ICarsRepository,

        @inject("DateProvider")
        private dateProvider: IDateProvider
    ) {}

    async execute({ rental_id, user_id }: IRequest): Promise<IRental> {
        const minimumDaily = 1;

        const rental = await this.rentalsRepository.findById(rental_id);

        if (!rental) {
            throw new AppError("Rental does not exists!");
        }

        const car = await this.carsRepository.findById(rental.car_id);

        if (!car) {
            throw new AppError("Car does not exists!");
        }

        const dateNow = this.dateProvider.dateNow();

        let daily = this.dateProvider.diffInDays(dateNow, rental.start_date);

        if (daily === 0) {
            daily = minimumDaily;
        }

        const delay = this.dateProvider.diffInDays(
            dateNow,
            rental.expected_return_date
        );

        let total = 0;

        if (delay > 0) {
            total = delay * car.fine_amount;
        }

        total += daily * car.daily_rate;

        rental.end_date = dateNow;
        rental.total = total;

        await this.rentalsRepository.finishRental(rental);
        await this.carsRepository.updateAvailable(rental.car_id, true);

        return rental;
    }
}

export { DevolutionRentalUseCase };
