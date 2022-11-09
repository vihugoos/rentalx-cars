import { Router } from "express";

import { SendForgotPasswordMailController } from "@modules/accounts/use-cases/user/send-forgot-password-mail/SendForgotPasswordMailController";

const passwordRoutes = Router();

passwordRoutes.post("/forgot", new SendForgotPasswordMailController().handle);

export { passwordRoutes };
