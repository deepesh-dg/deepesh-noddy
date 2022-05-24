import { NextFunction, Request, Response } from "express";
import { ResponseApi } from "../lib/Api/Response";
import { httpStatusCodes } from "../prototypes/enums/httpStatusCodes";
import { IController } from "./Interface/Controller";

export class Controller implements IController {
    public get(req: Request, res: Response, next: NextFunction) {
        next(ResponseApi.fake({ status: httpStatusCodes.BAD_REQUEST }));
    }

    public post(req: Request, res: Response, next: NextFunction) {
        next(ResponseApi.fake({ status: httpStatusCodes.BAD_REQUEST }));
    }

    public put(req: Request, res: Response, next: NextFunction) {
        next(ResponseApi.fake({ status: httpStatusCodes.BAD_REQUEST }));
    }

    public patch(req: Request, res: Response, next: NextFunction) {
        next(ResponseApi.fake({ status: httpStatusCodes.BAD_REQUEST }));
    }

    public delete(req: Request, res: Response, next: NextFunction) {
        next(ResponseApi.fake({ status: httpStatusCodes.BAD_REQUEST }));
    }
}
