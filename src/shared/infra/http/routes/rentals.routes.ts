import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/use-cases/create-rental/CreateRentalController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const rentalsRoutes = Router();

// Route to create a new rental
rentalsRoutes.post(
    "/",
    ensureAuthenticated,
    new CreateRentalController().handle
);

export { rentalsRoutes };
