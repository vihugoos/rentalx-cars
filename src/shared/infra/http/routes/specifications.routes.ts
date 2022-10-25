import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/use-cases/specification/create-specification/CreateSpecificationController";
import { ListSpecificationsController } from "@modules/cars/use-cases/specification/list-specifications/ListSpecificationsController";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const specificationsRoutes = Router();

// Route to create a new specification
specificationsRoutes.post(
    "/",
    ensureAuthenticated,
    ensureAdmin,
    new CreateSpecificationController().handle
);

// Route to get all specifications
specificationsRoutes.get(
    "/",
    ensureAuthenticated,
    ensureAdmin,
    new ListSpecificationsController().handle
);

export { specificationsRoutes };
