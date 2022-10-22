import { inject, injectable } from "tsyringe";

import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { deleteFile } from "@utils/delete-file";

interface IRequest {
    car_id: string;
    list_images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
    constructor(
        @inject("CarsImagesRepository")
        private carsImagesRepository: ICarsImagesRepository
    ) {}

    async execute({ car_id, list_images_name }: IRequest): Promise<void> {
        // Delete car images from temp directory
        await this.carsImagesRepository
            .filterImagesByCarId(car_id)
            .then((car_images) => {
                if (car_images) {
                    car_images.map(async (car_image) => {
                        await deleteFile(`./tmp/cars/${car_image.image_name}`);
                    });
                }
            });

        // Delete car images from database
        await this.carsImagesRepository.deleteImagesByCarId(car_id);

        list_images_name.map(async (image) => {
            await this.carsImagesRepository.create(car_id, image);
        });
    }
}

export { UploadCarImagesUseCase };
