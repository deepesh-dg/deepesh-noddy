import { Logger } from "../lib/Log/Logger";
import dbConfig from "./dbConfig";
import config from "./config";
import mailConfig from "./mailConfig";
import autoLoad from "./autoLoad";

const debug = new Logger({ moduleName: "noddy:start" });

const run = async () => {
    await config();
    await mailConfig();
    await dbConfig();
    await autoLoad();

    debug.debug("StartUp Files Loaded Successfully...");
};

export default run;
