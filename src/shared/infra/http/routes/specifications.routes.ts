import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/use-cases/specification/create-specification/CreateSpecificationController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

// Route to create a new specification (authenticated)
specificationsRoutes.use(ensureAuthenticated);
specificationsRoutes.post("/", createSpecificationController.handle);

export { specificationsRoutes };
