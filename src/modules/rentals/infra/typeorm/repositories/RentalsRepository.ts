import { getRepository, Repository } from "typeorm";

import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>;

    constructor() {
        this.repository = getRepository(Rental);
    }

    async create({
        car_id,
        user_id,
        expected_return_date,
    }: ICreateRentalDTO): Promise<Rental> {
        const newRental = this.repository.create({
            car_id,
            user_id,
            expected_return_date,
        });

        const rental = await this.repository.save(newRental);

        return rental;
    }

    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        return this.repository.findOne({ car_id });
    }

    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        return this.repository.findOne({ user_id });
    }

    async findById(id: string): Promise<Rental> {
        return this.repository.findOne({ id });
    }
}

export { RentalsRepository };
