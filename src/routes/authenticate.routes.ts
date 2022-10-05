import { Router } from "express";

import { AuthenticateUserController } from "../modules/accounts/use-cases/user/authenticate-user/AuthenticateUserController";

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

// Route to authenticate user
authenticateRoutes.post("/sessions", authenticateUserController.handle);

export { authenticateRoutes };
