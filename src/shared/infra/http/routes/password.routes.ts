import { Router } from "express";

import { ResetPasswordUserController } from "@modules/accounts/use-cases/user/reset-password-user/ResetPasswordUserController";
import { SendForgotPasswordMailController } from "@modules/accounts/use-cases/user/send-forgot-password-mail/SendForgotPasswordMailController";

const passwordRoutes = Router();

// Route to send an email with info for password recovery
passwordRoutes.post("/forgot", new SendForgotPasswordMailController().handle);

// Route to reset password
passwordRoutes.post("/reset", new ResetPasswordUserController().handle);

export { passwordRoutes };
