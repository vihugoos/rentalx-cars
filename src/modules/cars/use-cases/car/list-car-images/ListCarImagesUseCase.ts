import { inject, injectable } from "tsyringe";

import { ICarImageResponseDTO } from "@modules/cars/dtos/ICarImageResponseDTO";
import { CarImageMap } from "@modules/cars/mapper/CarImageMap";
import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";

@injectable()
export class ListCarImagesUseCase {
    constructor(
        @inject("CarsImagesRepository")
        private carsImagesRepository: ICarsImagesRepository
    ) {}

    async execute(car_id: string): Promise<ICarImageResponseDTO[]> {
        const carImages = await this.carsImagesRepository.filterImagesByCarId(
            car_id
        );

        const listCarImages = carImages.map((carImage) =>
            CarImageMap.toDTO(carImage)
        );

        return listCarImages;
    }
}
