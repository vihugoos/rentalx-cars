import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { IFilterListCarsDTO } from "@modules/cars/dtos/IFilterListCarsDTO";
import { ICar } from "@modules/cars/entities/ICar";

interface ICarsRepository {
    create(data: ICreateCarDTO): Promise<ICar>;
    findByLicensePlate(license_plate: string): Promise<ICar>;
    findAllAvailable({
        type_filter,
        value,
    }: IFilterListCarsDTO): Promise<ICar[]>;
}

export { ICarsRepository };
