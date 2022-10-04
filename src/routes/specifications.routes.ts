import { Router } from "express";

import { CreateSpecificationController } from "../modules/cars/use-cases/specification/create-specification/CreateSpecificationController";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

// Route to create a new specification
specificationsRoutes.post("/", createSpecificationController.handle);

export { specificationsRoutes };
