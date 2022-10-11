import { Logger } from "../lib/Log/Logger";
import { Express, json, urlencoded } from "express";
import { unhandledErrors } from "../events/unhandledErrors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import httpLogger from "./httpLogger";
import { resolve } from "path";
import { appSettings } from "../lib/AppSettings/appSettings";

const debug: Logger = new Logger({
    moduleName: "noddy:middlewares",
    type: "log",
});

export const middlewares = async (app: Express): Promise<Express> => {
    /**
     * Handeling Unhandled Errors and Promise Rejections
     */
    unhandledErrors();
    debug.debug("Registered Unhandled Errors nand Rejections");

    /**
     * HTTP Request Logger
     */
    app.use(httpLogger);

    /**
     * Using helmet for securing headers
     */
    app.use(helmet());

    /**
     * set cookie parser middleware
     */
    app.use(cookieParser());

    /**
     * Using necessary express middlewares
     */
    app.use(json());
    app.use(urlencoded({ extended: false }));

    /**
     * Custom Middleware
     */
    const setting = appSettings();
    const middleware = (
        await import(resolve(setting.path.app, setting.path.middleware))
    ).default;
    const returnedApp = await middleware(app);

    if (returnedApp) return returnedApp;

    return app;
};
