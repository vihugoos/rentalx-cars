import { Router } from "express";

import { AuthenticateUserController } from "@modules/accounts/use-cases/user/authenticate-user/AuthenticateUserController";
import { RefreshTokenController } from "@modules/accounts/use-cases/user/refresh-token/RefreshTokenController";

const authenticateRoutes = Router();

// Route to authenticate user
authenticateRoutes.post("/sessions", new AuthenticateUserController().handle);

// Route to update the refresh_token
authenticateRoutes.post("/refresh-token", new RefreshTokenController().handle);

export { authenticateRoutes };
