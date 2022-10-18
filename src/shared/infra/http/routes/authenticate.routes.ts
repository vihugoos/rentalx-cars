import { Router } from "express";

import { AuthenticateUserController } from "@modules/accounts/use-cases/user/authenticate-user/AuthenticateUserController";

const authenticateRoutes = Router();

// Route to authenticate user
authenticateRoutes.post("/sessions", new AuthenticateUserController().handle);

export { authenticateRoutes };
