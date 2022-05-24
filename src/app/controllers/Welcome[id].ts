import { Request, Response, NextFunction } from "express";
import { httpStatusCodes } from "../../core/prototypes/enums/httpStatusCodes";
import { Controller } from "../../core/controllers/Controller";
import { Config } from "../../core/conf/Config";

export class WelcomeId extends Controller {
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
                    id: req.params.id,
                },
            },
        };

        next();
    }
}
