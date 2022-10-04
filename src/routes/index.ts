import { Router } from "express";

import { categoriesRoutes } from "./categories.routes";
import { specificationsRoutes } from "./specifications.routes";
import { usersRoutes } from "./users.routes";

const routers = Router();

routers.use("/categories", categoriesRoutes);

routers.use("/specifications", specificationsRoutes);

routers.use("/users", usersRoutes);

export { routers };
