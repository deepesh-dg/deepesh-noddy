import { NextFunction, Request, Response } from "express";
import { ResponseApi } from "../../core/lib/Api/Response";
import { Controller } from "../../core/controllers/Controller";

export class Index extends Controller {
    public get(req: Request, res: Response, next: NextFunction) {
        res.locals = {
            sendApi: ResponseApi.fake(),
        };

        next();
    }
}
