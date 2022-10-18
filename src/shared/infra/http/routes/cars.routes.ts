import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateCarSpecificationController } from "@modules/cars/use-cases/car/create-car-specification/CreateCarSpecificationController";
import { CreateCarController } from "@modules/cars/use-cases/car/create-car/CreateCarController";
import { ListAvailableCarsController } from "@modules/cars/use-cases/car/list-available-cars/ListAvailableCarsController";
import { UploadCarImagesController } from "@modules/cars/use-cases/car/upload-car-images/UploadCarImagesController";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

const upload = multer(uploadConfig.upload("./tmp/cars"));

// Route to create a new car
carsRoutes.post(
    "/",
    ensureAuthenticated,
    ensureAdmin,
    createCarController.handle
);

// Route to return all available cars
carsRoutes.get("/available", listAvailableCarsController.handle);

// Route to create a new specification to the car
carsRoutes.post(
    "/specifications/:car_id",
    ensureAuthenticated,
    ensureAdmin,
    createCarSpecificationController.handle
);

// Routes to create imagens to cars
carsRoutes.post(
    "/images/:car_id",
    ensureAuthenticated,
    ensureAdmin,
    upload.array("images"),
    uploadCarImagesController.handle
);

export { carsRoutes };
