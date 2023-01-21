import { inject, injectable } from "tsyringe";

import { ICar } from "@modules/cars/entities/ICar";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    type_filter?: string;
    value?: string;
}

@injectable()
export class ListAvailableCarsUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) {}

    async execute({ type_filter, value }: IRequest): Promise<ICar[]> {
        const listFilter = ["name", "brand", "category_id"];

        if (type_filter && !listFilter.includes(type_filter)) {
            throw new AppError("Invalid type filter!");
        }

        const listCarsAvailable = await this.carsRepository.findAllAvailable(
            type_filter,
            value
        );

        return listCarsAvailable;
    }
}
