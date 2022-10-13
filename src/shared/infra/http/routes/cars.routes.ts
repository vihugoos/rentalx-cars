import { Router } from "express";

import { CreateCarController } from "@modules/cars/use-cases/car/create-car/CreateCarController";

const carsRoutes = Router();

const createCarController = new CreateCarController();

// Route to create a new car
carsRoutes.post("/", createCarController.handle);

export { carsRoutes };
