import { appSettings } from "../lib/AppSettings/AppSettings";
import { DBConfig } from "../conf/DB";
import { resolve } from "path";

const run = async () => {
    const setting = appSettings();
    const appDbConfig = await import(resolve(setting.path.conf.db));

    DBConfig.setAll({
        mongodbUrl: process.env.MONGODB_AUTH_URL ?? "",
    });

    await appDbConfig.default();
};

export default run;
