import { AutoLoadConfig } from "../conf/AutoLoad";
import appAutoLoad from "../../app/conf/AutoLoad";

const run = () => {
    appAutoLoad();

    AutoLoadConfig.run();
};

export default run;
