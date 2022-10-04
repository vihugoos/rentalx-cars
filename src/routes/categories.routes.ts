import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "../modules/cars/use-cases/category/create-category/CreateCategoryController";
import { ImportCategoryController } from "../modules/cars/use-cases/category/import-category/ImportCategoryController";
import { ListCategoriesController } from "../modules/cars/use-cases/category/list-categories/ListCategoriesController";

const categoriesRoutes = Router();

const fileUpload = multer({
    dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoryController = new ImportCategoryController();

// Route to create a new category of cars
categoriesRoutes.post("/", createCategoryController.handle);

// Route to return all categories
categoriesRoutes.get("/", listCategoriesController.handle);

// Route to import car categories file
categoriesRoutes.post(
    "/import",
    fileUpload.single("file"),
    importCategoryController.handle
);

export { categoriesRoutes };
