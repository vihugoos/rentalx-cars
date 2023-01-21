import { getRepository, Repository } from "typeorm";

import { CarImage } from "@modules/cars/infra/typeorm/entities/CarImage";
import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";

export class CarsImagesRepository implements ICarsImagesRepository {
    private repository: Repository<CarImage>;

    constructor() {
        this.repository = getRepository(CarImage);
    }

    async create(car_id: string, image_name: string): Promise<CarImage> {
        const carImage = this.repository.create({
            car_id,
            image_name,
        });

        const car = await this.repository.save(carImage);

        return car;
    }

    async filterImagesByCarId(id: string): Promise<CarImage[]> {
        const carImagesQuery = this.repository
            .createQueryBuilder("cars_image")
            .where("car_id = :car_id", { car_id: id });

        const listCarImages = await carImagesQuery.getMany();

        return listCarImages;
    }

    async deleteImagesByCarId(id: string): Promise<void> {
        return this.repository.query(
            `DELETE FROM cars_image WHERE car_id = $1`,
            [id]
        );
    }
}
