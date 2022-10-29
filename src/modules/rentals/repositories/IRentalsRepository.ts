import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRental } from "@modules/rentals/entities/IRental";

interface IRentalsRepository {
    create(data: ICreateRentalDTO): Promise<IRental>;
    findOpenRentalByCar(car_id: string): Promise<IRental>;
    findOpenRentalByUser(user_id: string): Promise<IRental>;
    findById(id: string): Promise<IRental>;
}

export { IRentalsRepository };
