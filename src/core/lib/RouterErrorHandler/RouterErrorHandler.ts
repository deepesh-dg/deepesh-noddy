import Debug, { Debugger } from "debug";
import { Request, Response, NextFunction } from "express";
import { err } from "neverthrow";
import { httpStatusCodes } from "../../prototypes/enums/httpStatusCodes";
import { ResponseApi } from "../Api/Response";

const debug: Debugger = Debug("core:lib:RouteErrorHandler");

export const safeRoute = (fn: any, args: any = []) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next, args);
        } catch (e: any) {
            const response = ResponseApi.make(
                err({
                    status: httpStatusCodes.INTERNAL_SERVER_ERROR,
                    headers: {},
                    body: {
                        name: "Error",
                        message: e || "Internal Server Error",
                    },
                })
            );

            debug(response);
            next(response);
        }
    };
};
