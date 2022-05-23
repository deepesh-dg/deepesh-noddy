import { AutoLoadConfig } from "../../core/conf/AutoLoad";

const run = () => {
    AutoLoadConfig.update({
        mail: false,
        db: false,
    });
};

export default run;
