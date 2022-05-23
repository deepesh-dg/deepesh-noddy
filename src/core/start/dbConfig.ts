import appDbConfig from "../../app/conf/dbConfig";
import { DBConfig } from "../conf/DB";

const run = () => {
    DBConfig.setAll({
        mongodbUrl: process.env.MONGODB_AUTH_URL ?? "",
    });

    appDbConfig();
};

export default run;
