import { NextFunction, Request, Response } from "express";
import { Controller } from "../../core/controllers/Controller";

export class Index extends Controller {
    public get(req: Request, res: Response, next: NextFunction) {
        res.send(`Hello Noddy!`);
    }
}
