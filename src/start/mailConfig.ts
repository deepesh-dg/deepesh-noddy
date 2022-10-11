import { normalizePort } from "../helpers/port/normalizePort";
import { MailConfig } from "../conf/Mail";
import { appSettings } from "../lib/AppSettings/appSettings";
import { resolve } from "path";

const run = async () => {
    const accept = ["on", "true", "yes"];

    MailConfig.setAll({
        service: process.env.MAIL_SERVICE ?? "",
        host: process.env.MAIL_HOST ?? "",
        port: normalizePort(Number(process.env.MAIL_PORT) || 587),
        name: process.env.MAIL_NAME ?? "",
        emailid: process.env.MAIL_EMAILID ?? "",
        user: process.env.MAIL_USERNAME ?? "",
        password: process.env.MAIL_PASSWORD ?? "",
        secure: accept.includes(process.env.MAIL_SECURE || ""),
    });

    const setting = appSettings();
    const mail = (
        await import(resolve(setting.path.app, setting.path.conf.mail))
    ).default;

    await mail();
};

export default run;
