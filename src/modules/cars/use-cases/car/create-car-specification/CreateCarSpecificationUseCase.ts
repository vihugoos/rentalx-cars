import { inject, injectable } from "tsyringe";

import { ICar } from "@modules/cars/entities/ICar";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    car_id: string;
    specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,

        @inject("SpecificationRepository")
        private specificationsRepository: ISpecificationsRepository
    ) {}

    async execute({ car_id, specifications_id }: IRequest): Promise<ICar> {
        const car = await this.carsRepository.findById(car_id);

        if (!car) {
            throw new AppError("Car does not exists!");
        }

        const specifications = await this.specificationsRepository.findByIds(
            specifications_id
        );

        car.specifications = specifications;

        return this.carsRepository.createCarSpecification(car);
    }
}

export { CreateCarSpecificationUseCase };
