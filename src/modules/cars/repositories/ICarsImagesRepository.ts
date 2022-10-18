import { ICarImage } from "@modules/cars/entities/ICarImage";

interface ICarsImagesRepository {
    create(car_id: string, image_name: string): Promise<ICarImage>;
    filterImagesByCarId(id: string): Promise<ICarImage[]>;
    deleteImagesByCarId(id: string): Promise<void>;
}

export { ICarsImagesRepository };
