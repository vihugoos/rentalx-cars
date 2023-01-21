import { getRepository, Repository } from "typeorm";

import { ICreateCategoryDTO } from "@modules/cars/dtos/ICreateCategoryDTO";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";

export class CategoriesRepository implements ICategoriesRepository {
    private repository: Repository<Category>;

    constructor() {
        this.repository = getRepository(Category);
    }

    async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
        const newCategory = this.repository.create({
            name,
            description,
        });

        const category = await this.repository.save(newCategory);

        return category;
    }

    async list(): Promise<Category[]> {
        return this.repository.find();
    }

    async findByName(name: string): Promise<Category> {
        return this.repository.findOne({ name });
    }
}
