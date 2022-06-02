import { NextFunction, Request, Response } from "express";
import { httpStatusCodes } from "../prototypes/enums/httpStatusCodes";

export const response = (req: Request, res: Response, next: NextFunction) => {
    let status = httpStatusCodes.INTERNAL_SERVER_ERROR;
    let headers = {};
    let body = {};

    if (res.locals.sendApi) {
        status = res.locals.sendApi.status;
        headers = res.locals.sendApi.headers;
        body = res.locals.sendApi.body;
    }

    res.status(status).header(headers).send({ status, body });

    return;
};

export default response;
