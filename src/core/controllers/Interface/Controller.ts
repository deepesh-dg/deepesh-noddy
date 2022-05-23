import { NextFunction, Request, Response } from "express";

export interface IController {
    get(req: Request, res: Response, next: NextFunction): void;
    post(req: Request, res: Response, next: NextFunction): void;
    put(req: Request, res: Response, next: NextFunction): void;
    patch(req: Request, res: Response, next: NextFunction): void;
    delete(req: Request, res: Response, next: NextFunction): void;
}
