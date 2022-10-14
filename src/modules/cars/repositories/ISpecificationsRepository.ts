import { ICreateSpecificationDTO } from "@modules/cars/dtos/ICreateSpecificationDTO";
import { ISpecification } from "@modules/cars/entities/ISpecification";

interface ISpecificationsRepository {
    create({ name, description }: ICreateSpecificationDTO): Promise<void>;
    findByName(name: string): Promise<ISpecification>;
}

export { ISpecificationsRepository, ICreateSpecificationDTO };
