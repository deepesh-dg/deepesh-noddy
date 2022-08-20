import { NextFunction, Request, Response } from "express";
import { httpStatusCodes } from "../prototypes/enums/httpStatusCodes";

export const setResponse = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.locals.api = {
        status: httpStatusCodes.INTERNAL_SERVER_ERROR,
        headers: {},
        body: {},
    };

    next();
};

export default setResponse;
