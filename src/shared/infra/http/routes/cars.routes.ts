import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateCarSpecificationsController } from "@modules/cars/use-cases/car/create-car-specifications/CreateCarSpecificationsController";
import { CreateCarController } from "@modules/cars/use-cases/car/create-car/CreateCarController";
import { ListAvailableCarsController } from "@modules/cars/use-cases/car/list-available-cars/ListAvailableCarsController";
import { UploadCarImagesController } from "@modules/cars/use-cases/car/upload-car-images/UploadCarImagesController";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const carsRoutes = Router();

const upload = multer(uploadConfig.upload("./tmp/cars"));

// Route to create a new car
carsRoutes.post(
    "/",
    ensureAuthenticated,
    ensureAdmin,
    new CreateCarController().handle
);

// Route to return all available cars
carsRoutes.get("/available", new ListAvailableCarsController().handle);

// Route to create a new specification to the car
carsRoutes.post(
    "/specifications/:car_id",
    ensureAuthenticated,
    ensureAdmin,
    new CreateCarSpecificationsController().handle
);

// Routes to create imagens to cars
carsRoutes.post(
    "/images/:car_id",
    ensureAuthenticated,
    ensureAdmin,
    upload.array("images"),
    new UploadCarImagesController().handle
);

export { carsRoutes };
