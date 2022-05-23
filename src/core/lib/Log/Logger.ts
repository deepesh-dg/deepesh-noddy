import Debug, { Debugger } from "debug";
import fs from "fs";

export enum LogLevels {
    EMERGENCY = 1,
    ALERT,
    CRITICAL,
    ERROR,
    WARNING,
    NOTICE,
    INFO,
    DEBUG,
}

export type LogConfig = {
    type?: "database" | "logFile" | "console";
    moduleName: string;
};

export class Logger {
    private _debug: Debugger;
    private _config: LogConfig;

    constructor(config: LogConfig) {
        this._config = config;
        this._debug = Debug(config.moduleName);

        // switch (config.type) {
        //     case "console":
        //         {}
        //         break;
        //     case "database":
        //         {}
        //         break;
        //     case "logFile":
        //         {}
        //         break;
        //     default:
        //         break;
        // }
    }

    public log(level: LogLevels, ...messages: any[]) {
        let message: any = messages.slice(1);

        switch (this._config.type) {
            case "console":
                {
                    this._debug(messages[0], ...message);
                }
                break;
            case "logFile": {
                const time = new Date();
                message = "\n" + time + " <-----> " + JSON.stringify(message);

                fs.appendFile(
                    `${__dirname}/../logs/${time
                        .toJSON()
                        .slice(0, 10)
                        .replace(/-/g, "_")}.log`,
                    message,
                    "utf8",
                    (err) => {
                        if (err) throw err;
                    }
                );
            }
            default:
                break;
        }
    }

    public debug(...message: any[]) {
        this._config.type = "console";
        this.log(LogLevels.DEBUG, ...message);
    }

    public static debug(...message: any[]) {
        const logObj = new Logger({
            type: "console",
            moduleName: "core:Logger",
        });
        logObj.debug(...message);
    }
}
