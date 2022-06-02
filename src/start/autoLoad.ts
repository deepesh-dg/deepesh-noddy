import { AutoLoadConfig } from "../conf/AutoLoad";
import { appSettings } from "../lib/AppSettings/AppSettings";
import { resolve } from "path";

const run = async () => {
    const setting = appSettings();
    const appAutoLoad = await import(resolve(setting.path.conf.autoLoad));
    appAutoLoad.default();

    AutoLoadConfig.run();
};

export default run;
