import { inject, injectable } from "tsyringe";

import { ICar } from "@modules/cars/entities/ICar";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    car_id: string;
    list_specifications_ids: string[];
}

@injectable()
class CreateCarSpecificationsUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,

        @inject("SpecificationsRepository")
        private specificationsRepository: ISpecificationsRepository
    ) {}

    async execute({
        car_id,
        list_specifications_ids,
    }: IRequest): Promise<ICar> {
        const car = await this.carsRepository.findById(car_id);

        if (!car) {
            throw new AppError("Car does not exists!");
        }

        const listSpecifications =
            await this.specificationsRepository.findByIds(
                list_specifications_ids
            );

        car.specifications = listSpecifications;

        return this.carsRepository.createCarSpecifications(car);
    }
}

export { CreateCarSpecificationsUseCase };
