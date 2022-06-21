import { MailConfig } from "../conf/Mail";
import { appSettings } from "../lib/AppSettings/AppSettings";
import { resolve } from "path";

const run = async () => {
    const setting = appSettings();
    const appMailConfig = await import(resolve(setting.path.conf.mail));

    MailConfig.setAll({
        service: process.env.MAIL_SERVICE ?? "",
        host: process.env.MAIL_HOST ?? "",
        port: process.env.MAIL_PORT ? Number(process.env.MAIL_PORT) : 587,
        name: process.env.MAIL_NAME ?? "",
        emailid: process.env.MAIL_EMAILID ?? "",
        user: process.env.MAIL_USERNAME ?? "",
        password: process.env.MAIL_PASSWORD ?? "",
        secure:
            process.env.MAIL_SECURE === "on" ||
            process.env.MAIL_SECURE === "true"
                ? true
                : false,
    });

    await appMailConfig.default();
};

export default run;
