import { Request, Response, NextFunction } from "express";
import { httpStatusCodes } from "../../core/prototypes/enums/httpStatusCodes";
import { Controller } from "../../core/controllers/Controller";

export class WelcomeId extends Controller {
    public get(req: Request, res: Response, next: NextFunction) {
        next({
            status: httpStatusCodes.OK,
            headers: {},
            body: req.params.id,
        });
    }
}
