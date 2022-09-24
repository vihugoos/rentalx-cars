import { Router } from "express";
import multer from "multer";

import { createCategoryController } from "../modules/cars/use-cases/category/create-category";
import { importCategoryController } from "../modules/cars/use-cases/category/import-category";
import { listCategoriesController } from "../modules/cars/use-cases/category/list-categories";

const categoriesRoutes = Router();

const fileUpload = multer({
    dest: "./tmp",
});

// Route to create a new category of cars
categoriesRoutes.post("/", (request, response) => {
    return createCategoryController.handle(request, response);
});

// Route to return all categories
categoriesRoutes.get("/", (request, response) => {
    return listCategoriesController.handle(request, response);
});

// Route to import car categories file
categoriesRoutes.post(
    "/import",
    fileUpload.single("file"),
    (request, response) => {
        return importCategoryController.handle(request, response);
    }
);

export { categoriesRoutes };
