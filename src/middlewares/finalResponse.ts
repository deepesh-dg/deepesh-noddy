import { NextFunction, Request, Response } from "express";
import { Logger } from "../lib/Log/Logger";
import { httpStatusCodes } from "../prototypes/enums/httpStatusCodes";

export const finalResponse = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const debug = new Logger({ moduleName: "noddy:response" });
    let status = httpStatusCodes.INTERNAL_SERVER_ERROR;
    let headers = {};
    let body = {};

    if (res.locals.api) {
        status = res.locals.api.status;
        headers = res.locals.api.headers;
        body = res.locals.api.body;
    }

    debug.debug(
        `[ "${res.locals.meta.id}" response ] --> responded in ${
            Date.now() - res.locals.meta.reqStartTimer
        }ms`
    );
    res.status(status).header(headers).send(body);

    return;
};

export default finalResponse;
