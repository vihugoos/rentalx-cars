import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICar } from "@modules/cars/entities/ICar";

interface ICarsRepository {
    create(data: ICreateCarDTO): Promise<ICar>;
    findById(id: string): Promise<ICar>;
    findByLicensePlate(license_plate: string): Promise<ICar>;
    findAllAvailable(type_filter: string, value: string): Promise<ICar[]>;
    createCarSpecifications(car: ICar): Promise<ICar>;
    updateAvailable(id: string, available: boolean): Promise<void>;
}

export { ICarsRepository };
