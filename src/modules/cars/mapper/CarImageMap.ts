import { instanceToInstance } from "class-transformer";

import { ICarImageResponseDTO } from "@modules/cars/dtos/ICarImageResponseDTO";
import { ICarImage } from "@modules/cars/entities/ICarImage";

class CarImageMap {
    static toDTO({
        id,
        car_id,
        image_name,
        image_url,
    }: ICarImage): ICarImageResponseDTO {
        const carImage = instanceToInstance({
            id,
            car_id,
            image_name,
            image_url,
        });

        return carImage;
    }
}

export { CarImageMap };
