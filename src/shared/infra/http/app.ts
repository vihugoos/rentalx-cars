import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import "reflect-metadata";
import "dotenv/config";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import upload from "@config/upload-file";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import "@shared/container";
import { AppError } from "@shared/errors/AppError";
import rateLimiterMiddleware from "@shared/infra/http/middlewares/rateLimiter";
import createConnection from "@shared/infra/typeorm";

import swaggerFile from "../../../swagger.json";
import { routers } from "./routes";

// Create database connection
createConnection();

const app = express();

app.use(express.json({ limit: "5mb" }));

app.use(cors());

app.use(rateLimiterMiddleware);

if (process.env.ENVIRONMENT === "prod") {
    Sentry.init({
        dsn: process.env.SENTRY_DSN,
        integrations: [
            new Sentry.Integrations.Http({ tracing: true }),
            new Tracing.Integrations.Express({ app }),
        ],
        tracesSampleRate: 1.0,
    });

    app.use(Sentry.Handlers.requestHandler());
    app.use(Sentry.Handlers.tracingHandler());
}

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));

app.use("/cars", express.static(`${upload.tmpFolder}/cars`));

app.use(routers);

if (process.env.ENVIRONMENT === "prod") {
    app.use(Sentry.Handlers.errorHandler());
}

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
            message: `Internal Server Error (500) - ${err.message}`,
        });
    }
);

export { app };
