import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICar } from "@modules/cars/entities/ICar";

interface ICarsRepository {
    create(data: ICreateCarDTO): Promise<ICar>;
    findByLicensePlate(license_plate: string): Promise<ICar>;
}

export { ICarsRepository };
