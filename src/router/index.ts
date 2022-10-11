import { Router } from "express";
import { resolve } from "path";
import { appSettings } from "../lib/AppSettings/appSettings";
// import { Logger } from "../lib/Log/Logger";

export class AppRouter {
    private static _router: Router = Router();
    // private static debug: Logger = new Logger({
    //     moduleName: "noddy:root:index",
    //     type: "log",
    // });

    private static async set(): Promise<void> {
        const setting = appSettings();
        const routes = (
            await import(resolve(setting.path.app, setting.path.routes))
        ).default;

        this._router = routes().getRoutes();
    }

    public static async get(): Promise<Router> {
        await this.set();
        return this._router;
    }
}
