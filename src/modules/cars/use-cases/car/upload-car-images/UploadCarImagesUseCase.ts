import { inject, injectable } from "tsyringe";

import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { IStorageProvider } from "@shared/container/providers/storage-provider/IStorageProvider";

interface IRequest {
    car_id: string;
    list_images_name: string[];
}

@injectable()
export class UploadCarImagesUseCase {
    constructor(
        @inject("CarsImagesRepository")
        private carsImagesRepository: ICarsImagesRepository,

        @inject("StorageProvider")
        private storageProvider: IStorageProvider
    ) {}

    async execute({ car_id, list_images_name }: IRequest): Promise<void> {
        await this.deleteImagesFromTmpDirectoryOrBucketS3(car_id);

        await this.carsImagesRepository.deleteImagesByCarId(car_id);

        await this.uploadNewImages(car_id, list_images_name);
    }

    private async deleteImagesFromTmpDirectoryOrBucketS3(
        car_id: string
    ): Promise<void> {
        const car_images = await this.carsImagesRepository.filterImagesByCarId(
            car_id
        );

        car_images.map(async (car_image) => {
            await this.storageProvider.delete(car_image.image_name, "cars");
        });
    }

    private async uploadNewImages(
        car_id: string,
        list_images_name: string[]
    ): Promise<void> {
        list_images_name.map(async (image) => {
            await this.storageProvider.save(image, "cars");
            await this.carsImagesRepository.create(car_id, image);
        });
    }
}
