import { NextFunction, Request, Response } from "express";
import { Logger } from "../lib/Log/Logger";

export const httpLogger = (req: Request, res: Response, next: NextFunction) => {
    const debug = new Logger({ moduleName: "noddy:httpLogger", type: "log" });
    const now = Date.now();

    debug.debug(`[${now}] --> ${req.method}  ${req.originalUrl}`);

    res.locals.meta = {
        id: now,
        reqStartTimer: now,
    };

    next();
};

export default httpLogger;
