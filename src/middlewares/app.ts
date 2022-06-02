import { Logger } from "../lib/Log/Logger";
import { Express, json, urlencoded } from "express";
import { unhandledErrors } from "../events/unhandledErrors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

const debug: Logger = new Logger({ moduleName: "noddy:middlewares" });

export const middlewares = (app: Express): Express => {
    /**
     * Handeling Unhandled Errors and Promise Rejections
     */
    unhandledErrors();
    debug.debug("Registered Unhandled Errors nand Rejections");

    /**
     * set cookie parser middleware
     */
    app.use(cookieParser());

    /**
     * Using helmet for securing headers
     */
    app.use(helmet());

    app.use(json());
    app.use(urlencoded({ extended: false }));

    return app;
};
