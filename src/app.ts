import express, { Express, Request, Response, NextFunction } from "express";
import { startServer } from "./bin/www";
import { Logger } from "./lib/Log/Logger";
import { middlewares } from "./middlewares/app";
import createHttpError from "http-errors";
import { ErrorFlag } from "./prototypes/type/Error";
import finalResponse from "./middlewares/finalResponse";
import { AppRouter } from "./router/index";
import bootup from "./start/start";
import LoadAppSettings from "./lib/AppSettings/LoadAppSettings";

export const bootstrap = async () => {
    const app: Express = express();
    const debug: Logger = new Logger({ moduleName: "noddy:root" });

    /**
     * Loading App Setting Fils
     */
    await LoadAppSettings();

    /**
     * starting bootup file for loading application
     */
    await bootup();

    /**
     * Configure Global Middleware
     */
    await middlewares(app);
    debug.debug("App Middleware Completed");

    /**
     * define a route handlers
     */
    app.use(await AppRouter.get());
    debug.debug("All Routes Set");

    /**
     * Catch 404 and forward to ErroR Handler
     */
    app.use((req: Request, res: Response, next: NextFunction) => {
        next(createHttpError(404));
    });
    debug.debug("Set 404 Response");

    /**
     * Error Handler
     */
    app.use(
        (err: ErrorFlag, req: Request, res: Response, next: NextFunction) => {
            res.locals.api = err;
            finalResponse(req, res, next);
        }
    );

    debug.debug("Handling Request Error");
    await startServer(app);

    return true;
};

export default bootstrap;
