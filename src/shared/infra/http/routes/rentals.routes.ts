import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/use-cases/create-rental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/use-cases/devolution-rental/DevolutionRentalController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const rentalsRoutes = Router();

// Route to create a new rental
rentalsRoutes.post(
    "/",
    ensureAuthenticated,
    new CreateRentalController().handle
);

// Route to return the car
rentalsRoutes.post(
    "/devolution/:rental_id",
    ensureAuthenticated,
    new DevolutionRentalController().handle
);

export { rentalsRoutes };
