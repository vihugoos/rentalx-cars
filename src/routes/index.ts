import { Router } from "express";

import { categoriesRoutes } from "./categories.routes";
import { specificationsRoutes } from "./specifications.routes";

const routers = Router();

routers.use("/categories", categoriesRoutes);

routers.use("/specifications", specificationsRoutes);

export { routers };
