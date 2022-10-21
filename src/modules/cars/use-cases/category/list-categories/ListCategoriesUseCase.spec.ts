import { CategoriesRepositoryInMemory } from "@modules/cars/infra/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "@modules/cars/use-cases/category/create-category/CreateCategoryUseCase";

import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;
let listCategoriesUseCase: ListCategoriesUseCase;

describe("List Categories Use Case", () => {
    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(
            categoriesRepositoryInMemory
        );
        listCategoriesUseCase = new ListCategoriesUseCase(
            categoriesRepositoryInMemory
        );
    });

    it("Should be able to list categories", async () => {
        await createCategoryUseCase.execute({
            name: "Category 1",
            description: "Category 1",
        });

        await createCategoryUseCase.execute({
            name: "Category 2",
            description: "Category 2",
        });

        const categories = await listCategoriesUseCase.execute();

        expect(categories.length).toEqual(2);
    });
});
