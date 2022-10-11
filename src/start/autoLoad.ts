import { appSettings } from "../lib/AppSettings/appSettings";
import { AutoLoadConfig } from "../conf/AutoLoad";
import { resolve } from "path";

const run = async () => {
    const setting = appSettings();
    const autoLoad = (
        await import(resolve(setting.path.app, setting.path.conf.autoLoad))
    ).default;

    await autoLoad();

    await AutoLoadConfig.run();
};

export default run;
