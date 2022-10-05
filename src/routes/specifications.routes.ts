import { Router } from "express";

import { ensureAuthenticated } from "../modules/accounts/middlewares/ensureAuthenticated";
import { CreateSpecificationController } from "../modules/cars/use-cases/specification/create-specification/CreateSpecificationController";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

// Route to create a new specification (authenticated)
specificationsRoutes.use(ensureAuthenticated);
specificationsRoutes.post("/", createSpecificationController.handle);

export { specificationsRoutes };
