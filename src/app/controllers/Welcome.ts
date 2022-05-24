import { Request, Response, NextFunction } from "express";
import { httpStatusCodes } from "../../core/prototypes/enums/httpStatusCodes";
import { Controller } from "../../core/controllers/Controller";
import { Logger } from "../../core/lib/Log/Logger";
import { Config } from "../../core/conf/Config";

const debug: Logger = new Logger({ moduleName: "app:controller-welcome" });

export class Welcome extends Controller {
    private appInfo;

    constructor() {
        super();
        this.appInfo = {
            app: {
                framework: Config.get("app.name"),
                developedBy: Config.get("app.developedBy"),
                social: Config.get("app.social"),
                version: Config.get("app.version"),
            },
        };
    }

    public get(req: Request, res: Response, next: NextFunction) {
        res.locals = {
            sendApi: {
                status: httpStatusCodes.OK,
                headers: {},
                body: {
                    ...this.appInfo,
                },
            },
        };

        next();
    }

    public post(req: Request, res: Response, next: NextFunction) {
        res.locals = {
            sendApi: {
                status: httpStatusCodes.OK,
                headers: {},
                body: {
                    ...req.body,
                    ...this.appInfo,
                },
            },
        };

        next();
    }

    public patch(req: Request, res: Response, next: NextFunction) {
        res.locals = {
            sendApi: {
                status: httpStatusCodes.OK,
                headers: {},
                body: {
                    ...req.body,
                    ...this.appInfo,
                },
            },
        };

        next();
    }

    public put(req: Request, res: Response, next: NextFunction) {
        res.locals = {
            sendApi: {
                status: httpStatusCodes.OK,
                headers: {},
                body: {
                    ...req.body,
                    ...this.appInfo,
                },
            },
        };

        next();
    }

    public delete(req: Request, res: Response, next: NextFunction) {
        res.locals = {
            sendApi: {
                status: httpStatusCodes.OK,
                headers: {},
                body: {
                    ...this.appInfo,
                },
            },
        };

        next();
    }
}
