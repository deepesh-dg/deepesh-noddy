import _ from "lodash";
import { resolve } from "path";
import { appSettings } from "./appSettings";
import { Express } from "express";
import { Router } from "../../router/Router";

type App = {
    app: string;
    routes: Router;
    middleware: (app: Express) => Promise<Express | void>;
    conf: {
        conf: () => Promise<void>;
        mail: () => Promise<void>;
        db: () => Promise<void>;
        autoLoad: () => Promise<void>;
    };
};

const setting = appSettings();
export let app!: App;

const get = async (property: string) => {
    return (
        await import(resolve(setting.path.app, _.get(setting.path, property)))
    ).default;
};

const run = async () => {
    app = {
        app: "setting.path.app",
        routes: await get("routes"),
        middleware: await get("middleware"),
        conf: {
            conf: await get("conf.conf"),
            mail: await get("conf.mail"),
            db: await get("conf.db"),
            autoLoad: await get("conf.autoLoad"),
        },
    };
};

export default run;
