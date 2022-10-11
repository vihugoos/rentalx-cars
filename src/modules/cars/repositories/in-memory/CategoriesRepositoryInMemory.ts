import { Category } from "@modules/cars/entities/Category";

import {
    ICategoriesRepository,
    ICreateCategoryDTO,
} from "../ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository {
    categories: Category[] = [];

    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const category = new Category();

        Object.assign(category, {
            name,
            description,
        });

        this.categories.push(category);
    }

    async list(): Promise<Category[]> {
        const allCategories = this.categories;
        return allCategories;
    }

    async findByName(name: string): Promise<Category> {
        const category = this.categories.find(
            (category) => category.name === name
        );

        return category;
    }
}

export { CategoriesRepositoryInMemory };
