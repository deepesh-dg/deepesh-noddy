import { existsSync, readFileSync } from "fs";
import { Logger } from "../Log/Logger";

type NoddySettings = {
    path: {
        app: string;
        routes: string;
        conf: {
            mail: string;
            conf: string;
            db: string;
            autoLoad: string;
        };
        middleware: string;
    };
};

export const appSettings = () => {
    if (!existsSync("noddy-settings.json")) {
        const debugLog = new Logger({
            type: "log",
            moduleName: "noddy:appSettings",
        });
        debugLog.emergency("noddy-settings.json FILE CONFIG NOT FOUND");

        process.exit(500);
    }

    const rawdata = readFileSync("noddy-settings.json", "utf-8");
    const setting = JSON.parse(rawdata) as NoddySettings;

    return setting;
};
