import { ICreateCategoryDTO } from "@modules/cars/dtos/ICreateCategoryDTO";
import { ICategory } from "@modules/cars/entities/ICategory";

interface ICategoriesRepository {
    create({ name, description }: ICreateCategoryDTO): Promise<void>;
    list(): Promise<ICategory[]>;
    findByName(name: string): Promise<ICategory>;
}

export { ICategoriesRepository, ICreateCategoryDTO };
