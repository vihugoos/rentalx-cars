import { Router } from "express";
import multer from "multer";

import uploadConfig from "../config/upload";
import { ensureAuthenticated } from "../modules/accounts/middlewares/ensureAuthenticated";
import { CreateUserController } from "../modules/accounts/use-cases/user/create-user/CreateUserController";
import { UpdateUserAvatarController } from "../modules/accounts/use-cases/user/update-user-avatar/UpdateUserAvatarController";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

// Route to create a new user
usersRoutes.post("/", createUserController.handle);

// Route to update an avatar image
usersRoutes.patch(
    "/avatar",
    ensureAuthenticated,
    uploadAvatar.single("avatar"),
    updateUserAvatarController.handle
);

export { usersRoutes };
