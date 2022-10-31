import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/use-cases/create-rental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/use-cases/devolution-rental/DevolutionRentalController";
import { ListRentalsByUserController } from "@modules/rentals/use-cases/list-rentals-by-user/ListRentalsByUserController";
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

// Routes to get all rentals by user
rentalsRoutes.get(
    "/user",
    ensureAuthenticated,
    new ListRentalsByUserController().handle
);

export { rentalsRoutes };
