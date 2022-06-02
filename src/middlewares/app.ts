import { Logger } from "../lib/Log/Logger";
import { Express, json, urlencoded } from "express";
import { unhandledErrors } from "../events/unhandledErrors";

const debug: Logger = new Logger({ moduleName: "noddy:middlewares" });

export const middlewares = (app: Express): Express => {
    /**
     * Handeling Unhandled Errors and Promise Rejections
     */
    unhandledErrors();
    debug.debug("Registered Unhandled Errors nand Rejections");

    app.use(json());
    app.use(urlencoded({ extended: false }));

    return app;
};
