import { resolve } from "path";
import { appSettings } from "../lib/AppSettings/appSettings";
import { DBConfig } from "../conf/DB";

const run = async () => {
    DBConfig.setAll({
        url: process.env.MONGODB_AUTH_URL ?? "",
    });

    const setting = appSettings();
    const db = (await import(resolve(setting.path.app, setting.path.conf.db)))
        .default;

    await db();
};

export default run;
