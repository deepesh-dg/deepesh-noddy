import { NextFunction, Request, Response } from "express";
import { Logger } from "../lib/Log/Logger";
import { httpStatusCodes } from "../prototypes/enums/httpStatusCodes";

export const response = (req: Request, res: Response, next: NextFunction) => {
    const debug = new Logger({ moduleName: "noddy:response" });
    let status = httpStatusCodes.INTERNAL_SERVER_ERROR;
    let headers = {};
    let body = {};

    if (res.locals.sendApi) {
        status = res.locals.sendApi.status;
        headers = res.locals.sendApi.headers;
        body = res.locals.sendApi.body;
    }

    debug.debug(
        `[ "${res.locals.meta.id}" response ] --> responded in ${
            Date.now() - res.locals.meta.reqStartTimer
        }ms`
    );
    res.status(status).header(headers).send(body);

    return;
};

export default response;
