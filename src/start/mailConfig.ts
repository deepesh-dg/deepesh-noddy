// import { MailConfig } from "../conf/Mail";
import { appSettings } from "../lib/AppSettings/AppSettings";
import { resolve } from "path";

const run = async () => {
    const setting = appSettings();
    const appMailConfig = await import(resolve(setting.path.conf.mail));
    appMailConfig.default();
};

export default run;
