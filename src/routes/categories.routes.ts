import { Router } from "express";

import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { listCategoriesController } from "../modules/cars/useCases/listCategories";

const categoriesRoutes = Router();

// Route to create a new category of cars
categoriesRoutes.post("/", (request, response) => {
    return createCategoryController.handle(request, response);
});

// Route to return all categories
categoriesRoutes.get("/", (request, response) => {
    return listCategoriesController.handle(request, response);
});

export { categoriesRoutes };
