import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload-file";
import { CreateUserController } from "@modules/accounts/use-cases/user/create-user/CreateUserController";
import { ListUsersController } from "@modules/accounts/use-cases/user/list-users/ListUsersController";
import { UpdateUserAvatarController } from "@modules/accounts/use-cases/user/update-user-avatar/UpdateUserAvatarController";
import { UserProfileController } from "@modules/accounts/use-cases/user/user-profile/UserProfileController";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

// Route to create a new user
usersRoutes.post("/", new CreateUserController().handle);

// Route to update an avatar image
usersRoutes.patch(
    "/avatar",
    ensureAuthenticated,
    uploadAvatar.single("avatar"),
    new UpdateUserAvatarController().handle
);

// Route to get all users
usersRoutes.get(
    "/",
    ensureAuthenticated,
    ensureAdmin,
    new ListUsersController().handle
);

// Route to get an user
usersRoutes.get(
    "/profile",
    ensureAuthenticated,
    new UserProfileController().handle
);

export { usersRoutes };
