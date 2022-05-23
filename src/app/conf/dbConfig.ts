import { DBConfig } from "../../core/conf/DB";
import { Logger } from "../../core/lib/Log/Logger";

const debug: Logger = new Logger({ moduleName: "app:conf:db" });

const run = () => {
    // DBConfig.setAll({
    //     mongodbUrl: process.env.MONGODB_AUTH_URL ?? '',
    // });

    debug.debug("Mail Configurations", DBConfig.get());
};

export default run;
