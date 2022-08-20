import { AutoLoadConfig } from "../conf/AutoLoad";
import { app } from "../lib/AppSettings/LoadAppSettings";

const run = async () => {
    await app.conf.autoLoad();

    await AutoLoadConfig.run();
};

export default run;
