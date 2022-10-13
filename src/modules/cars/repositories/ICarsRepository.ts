import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { ICar } from "../entities/ICar";

interface ICarsRepository {
    create(data: ICreateCarDTO): Promise<ICar>;
    findByLicensePlate(license_plate: string): Promise<ICar>;
}

export { ICarsRepository };
