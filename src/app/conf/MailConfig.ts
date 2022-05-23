import { MailConfig } from "../../core/conf/Mail";
import { Logger } from "../../core/lib/Log/Logger";

const debug: Logger = new Logger({ moduleName: "app:conf:mail" });

const run = () => {
    // MailConfig.setAll({
    // service: process.env.MAIL_SERVICE ?? "",
    // host: process.env.MAIL_HOST ?? "",
    // port: process.env.MAIL_PORT ? Number(process.env.MAIL_PORT) : 587,
    // name: process.env.MAIL_NAME ?? "",
    // emailid: process.env.MAIL_EMAILID ?? "",
    // user: process.env.MAIL_USERNAME ?? "",
    // password: process.env.MAIL_PASSWORD ?? "",
    // });

    debug.debug("Mail Configurations", MailConfig.get());
};

export default run;
