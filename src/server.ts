import express from "express";
import swaggerUi from "swagger-ui-express";

import "./database";
import "./shared/container";

import { routers } from "./routes";
import swaggerFile from "./swagger.json";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(routers);

app.listen(3333, () => {
    console.log("\nHTTP Server is running on http://localhost:3333");
});
