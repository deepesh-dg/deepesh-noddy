import { app } from "../lib/AppSettings/LoadAppSettings";
import { DBConfig } from "../conf/DB";

const run = async () => {
    DBConfig.setAll({
        url: process.env.MONGODB_AUTH_URL ?? "",
    });

    await app.conf.db();
};

export default run;
