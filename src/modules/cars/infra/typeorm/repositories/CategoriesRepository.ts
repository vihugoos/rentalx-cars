import { getRepository, Repository } from "typeorm";

import { ICreateCategoryDTO } from "@modules/cars/dtos/ICreateCategoryDTO";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
    private repository: Repository<Category>;

    constructor() {
        this.repository = getRepository(Category);
    }

    async create({ description, name }: ICreateCategoryDTO): Promise<Category> {
        const newCategory = this.repository.create({
            description,
            name,
        });

        const category = await this.repository.save(newCategory);

        return category;
    }

    async list(): Promise<Category[]> {
        const categories = await this.repository.find();

        return categories;
    }

    async findByName(name: string): Promise<Category> {
        const category = await this.repository.findOne({ name });

        return category;
    }
}

export { CategoriesRepository };
