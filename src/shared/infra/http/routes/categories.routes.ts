import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "@modules/cars/use-cases/category/create-category/CreateCategoryController";
import { ImportCategoriesController } from "@modules/cars/use-cases/category/import-categories/ImportCategoriesController";
import { ListCategoriesController } from "@modules/cars/use-cases/category/list-categories/ListCategoriesController";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const categoriesRoutes = Router();

const fileUpload = multer({
    dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoriesController = new ImportCategoriesController();

// Route to create a new category of cars
categoriesRoutes.post(
    "/",
    ensureAuthenticated,
    ensureAdmin,
    createCategoryController.handle
);

// Route to return all categories
categoriesRoutes.get("/", listCategoriesController.handle);

// Route to import car categories file
categoriesRoutes.post(
    "/import",
    fileUpload.single("file"),
    ensureAuthenticated,
    ensureAdmin,
    importCategoriesController.handle
);

export { categoriesRoutes };
