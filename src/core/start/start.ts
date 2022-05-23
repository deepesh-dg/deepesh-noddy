import { Logger } from "../lib/Log/Logger";
import dbConfig from "./dbConfig";
import config from "./config";
import mailConfig from "./mailConfig";
import autoLoad from "./autoLoad";

const debug = new Logger({ moduleName: "core:start" });

const run = () => {
    config();
    mailConfig();
    dbConfig();
    autoLoad();

    debug.debug("StartUp Files Loaded Successfully...");
};

export default run;
