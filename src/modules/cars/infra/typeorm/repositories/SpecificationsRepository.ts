import { getRepository, Repository } from "typeorm";

import { ICreateSpecificationDTO } from "@modules/cars/dtos/ICreateSpecificationDTO";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";

export class SpecificationsRepository implements ISpecificationsRepository {
    private repository: Repository<Specification>;

    constructor() {
        this.repository = getRepository(Specification);
    }

    async create({
        name,
        description,
    }: ICreateSpecificationDTO): Promise<Specification> {
        const newSpecification = this.repository.create({
            name,
            description,
        });

        const specification = await this.repository.save(newSpecification);

        return specification;
    }

    async list(): Promise<Specification[]> {
        return this.repository.find();
    }

    async findByName(name: string): Promise<Specification> {
        return this.repository.findOne({ name });
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        return this.repository.findByIds(ids);
    }
}
