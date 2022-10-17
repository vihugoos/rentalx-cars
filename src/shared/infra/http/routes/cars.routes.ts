import { Router } from "express";

import { CreateCarSpecificationController } from "@modules/cars/use-cases/car/create-car-specification/CreateCarSpecificationController";
import { CreateCarController } from "@modules/cars/use-cases/car/create-car/CreateCarController";
import { ListAvailableCarsController } from "@modules/cars/use-cases/car/list-available-cars/ListAvailableCarsController";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();

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

export { carsRoutes };
