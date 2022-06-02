import { Router } from "express";
import { appSettings } from "../lib/AppSettings/AppSettings";
import { resolve } from "path";
import { Logger } from "../lib/Log/Logger";

export class AppRouter {
    private static _router: Router = Router();
    private static debug: Logger = new Logger({
        moduleName: "noddy:root:index",
    });

    public static async get(): Promise<Router> {
        const settings = appSettings();
        const appRouter = await import(resolve(settings.path.routes));

        this._router = appRouter.default.getRoutes();
        return this._router;
    }
}
