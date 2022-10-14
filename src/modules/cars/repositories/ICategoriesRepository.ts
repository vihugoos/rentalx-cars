import { ICategory } from "@modules/cars/entities/ICategory";

interface ICreateCategoryDTO {
    name: string;
    description: string;
}

interface ICategoriesRepository {
    create({ name, description }: ICreateCategoryDTO): Promise<void>;
    list(): Promise<ICategory[]>;
    findByName(name: string): Promise<ICategory>;
}

export { ICategoriesRepository, ICreateCategoryDTO };
