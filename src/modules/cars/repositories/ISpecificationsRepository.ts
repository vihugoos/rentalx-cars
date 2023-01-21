import { ICreateSpecificationDTO } from "@modules/cars/dtos/ICreateSpecificationDTO";
import { ISpecification } from "@modules/cars/entities/ISpecification";

export interface ISpecificationsRepository {
    create(data: ICreateSpecificationDTO): Promise<ISpecification>;
    list(): Promise<ISpecification[]>;
    findByName(name: string): Promise<ISpecification>;
    findByIds(ids: string[]): Promise<ISpecification[]>;
}
