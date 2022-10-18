import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateUserController } from "@modules/accounts/use-cases/user/create-user/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/use-cases/user/update-user-avatar/UpdateUserAvatarController";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

// Route to create a new user
usersRoutes.post(
    "/",
    ensureAuthenticated,
    ensureAdmin,
    new CreateUserController().handle
);

// Route to update an avatar image
usersRoutes.patch(
    "/avatar",
    ensureAuthenticated,
    uploadAvatar.single("avatar"),
    new UpdateUserAvatarController().handle
);

export { usersRoutes };
