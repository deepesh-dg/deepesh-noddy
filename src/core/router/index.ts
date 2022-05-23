import { Router } from "express";
import appRouter from "../../app/router/Router";

export class AppRouter {
    private static _router: Router = Router();

    public static get(): Router {
        this._router = appRouter.getRoutes();
        return this._router;
    }
}
