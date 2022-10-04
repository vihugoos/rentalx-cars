import { Router } from "express";

import { CreateUserController } from "../modules/accounts/use-cases/user/create-user/CreateUserController";

const usersRoutes = Router();

const createUserController = new CreateUserController();

// Route to create a new user
usersRoutes.post("/", createUserController.handle);

export { usersRoutes };
