import { Router } from "express";
import { app } from "../lib/AppSettings/LoadAppSettings";
import { Logger } from "../lib/Log/Logger";

export class AppRouter {
    private static _router: Router = Router();
    private static debug: Logger = new Logger({
        moduleName: "noddy:root:index",
    });

    private static set(): void {
        this._router = app.routes.getRoutes();
    }

    public static async get(): Promise<Router> {
        this.set();
        return this._router;
    }
}
