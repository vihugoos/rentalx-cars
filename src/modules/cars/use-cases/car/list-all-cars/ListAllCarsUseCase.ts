import { inject, injectable } from "tsyringe";

import { ICar } from "@modules/cars/entities/ICar";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

@injectable()
class ListAllCarsUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) {}

    async execute(): Promise<ICar[]> {
        return this.carsRepository.list();
    }
}

export { ListAllCarsUseCase };
