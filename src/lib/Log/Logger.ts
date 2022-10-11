import debug, { Debugger } from "debug";
import { FileHandler } from "./Handlers/FileHandler";

export enum LogLevels {
    EMERGENCY = 1,
    ERROR,
    WARNING,
    DEBUG,
}

export type Config = {
    type: "db" | "file" | "log";
    moduleName: string;
};

export class Logger {
    private _debug: Debugger;
    private config: Config;
    private msgs: any[] = [];

    constructor(config: Config) {
        this.config = config;
        this._debug = debug(this.config.moduleName);
    }

    private _log() {
        this._debug(this.msgs[0], ...this.msgs.slice(1));
    }

    private _file() {
        const fileHandler = new FileHandler(this.msgs);
        fileHandler.write();
    }

    private _db() {
        return undefined;
    }

    public log(level: LogLevels, ...msgs: any[]) {
        this.msgs = msgs;

        const handle = () => {
            if (this.config.type === "log") this._log();
            else if (this.config.type === "file") this._file();
            else if (this.config.type === "db") this._db();
        };

        if (level === LogLevels.DEBUG) this.msgs.splice(0, 0, "DEBUG");
        if (level === LogLevels.WARNING) this.msgs.splice(0, 0, "WARNING");
        if (level === LogLevels.ERROR) this.msgs.splice(0, 0, "ERROR");
        if (level === LogLevels.EMERGENCY) this.msgs.splice(0, 0, "EMERGENCY");

        handle();
    }

    public debug(...msgs: any[]) {
        this.log(LogLevels.DEBUG, ...msgs);
    }

    public warning(...msgs: any[]) {
        this.log(LogLevels.WARNING, ...msgs);
    }

    public error(...msgs: any[]) {
        this.log(LogLevels.ERROR, ...msgs);
    }

    public emergency(...msgs: any[]) {
        this.log(LogLevels.EMERGENCY, ...msgs);
    }
}
