import { ISpecification } from "@modules/cars/entities/ISpecification";

interface ICreateSpecificationDTO {
    name: string;
    description: string;
}

interface ISpecificationsRepository {
    create({ name, description }: ICreateSpecificationDTO): Promise<void>;
    findByName(name: string): Promise<ISpecification>;
}

export { ISpecificationsRepository, ICreateSpecificationDTO };
