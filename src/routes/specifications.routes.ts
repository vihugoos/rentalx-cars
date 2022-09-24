import { Router } from "express";

import { createSpecificationController } from "../modules/cars/use-cases/specification/create-specification";

const specificationsRoutes = Router();

// Route to create a new specification
specificationsRoutes.post("/", (request, response) => {
    return createSpecificationController.handle(request, response);
});

export { specificationsRoutes };
