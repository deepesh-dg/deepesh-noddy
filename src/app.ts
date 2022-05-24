import { Logger } from "./core/lib/Log/Logger";
import express, { NextFunction, Request, Response, Express } from "express";
import { middlewares } from "./core/middlewares/app";
import createHttpError from "http-errors";
import { AppRouter } from "./core/router";
import { httpStatusCodes } from "./core/prototypes/enums/httpStatusCodes";
import { ErrorFlag } from "./core/prototypes/type/Error";
import response from "./core/middlewares/response";

const debug: Logger = new Logger({ moduleName: "core:root" });
const app: Express = express();

/**
 * Configure Global Middleware
 */
middlewares(app);
debug.debug("App Middleware Completed");

/**
 * define a route handlers
 */
app.use(AppRouter.get());
debug.debug("All Routes Set");

/**
 * Catch 404 and forward to ErroR Handler
 */
app.use((req: Request, res: Response, next: NextFunction) => {
    next(createHttpError(404));
});
debug.debug("Set 404 Page");

/**
 * Error Handler
 */
app.use((err: ErrorFlag, req: Request, res: Response, next: NextFunction) => {
    res.locals = {
        sendApi: err,
    };
    response(req, res, next);
});

debug.debug("Handling Request Error");

export default app;
