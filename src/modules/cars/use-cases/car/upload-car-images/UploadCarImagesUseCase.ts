import { inject, injectable } from "tsyringe";

import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { IStorageProvider } from "@shared/container/providers/storage-provider/IStorageProvider";

interface IRequest {
    car_id: string;
    list_images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
    constructor(
        @inject("CarsImagesRepository")
        private carsImagesRepository: ICarsImagesRepository,

        @inject("StorageProvider")
        private storageProvider: IStorageProvider
    ) {}

    async execute({ car_id, list_images_name }: IRequest): Promise<void> {
        // Delete car images from temp directory
        await this.carsImagesRepository
            .filterImagesByCarId(car_id)
            .then((car_images) => {
                if (car_images) {
                    car_images.map(async (car_image) => {
                        await this.storageProvider.delete(
                            car_image.image_name,
                            "cars"
                        );
                    });
                }
            });

        // Delete car images from database
        await this.carsImagesRepository.deleteImagesByCarId(car_id);

        list_images_name.map(async (image) => {
            await this.storageProvider.save(image, "cars");
            await this.carsImagesRepository.create(car_id, image);
        });
    }
}

export { UploadCarImagesUseCase };
