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

// Route to create a new category of cars
categoriesRoutes.post(
    "/",
    ensureAuthenticated,
    ensureAdmin,
    new CreateCategoryController().handle
);

// Route to return all categories
categoriesRoutes.get("/", new ListCategoriesController().handle);

// Route to import car categories file
categoriesRoutes.post(
    "/import",
    fileUpload.single("file"),
    ensureAuthenticated,
    ensureAdmin,
    new ImportCategoriesController().handle
);

export { categoriesRoutes };
