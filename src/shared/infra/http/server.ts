import express, { NextFunction, Request, Response } from "express";
import "reflect-metadata";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import "@shared/container";
import { AppError } from "@shared/errors/AppError";
import createConnection from "@shared/infra/typeorm";

import swaggerFile from "../../../swagger.json";
import { routers } from "./routes";

// Create database connection
createConnection();

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(routers);

app.use(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                message: err.message,
            });
        }

        console.log("\nInternal Server Error (500):", err);

        return response.status(500).json({
            status: "Error",
            message: `Internal Server Error - ${err.message}`,
        });
    }
);

app.listen(3333, () => {
    console.log("\nHTTP Server is running on http://localhost:3333");
});
