import { appendFile } from "fs";
import { resolve } from "path";
import { appSettings } from "../../../lib/AppSettings/appSettings";

export class FileHandler {
    private app;

    constructor(private msg: any) {
        this.app = appSettings();
    }

    write() {
        const time = new Date();
        const message = "\n" + time + " <--------> " + JSON.stringify(this.msg);

        appendFile(
            `${resolve(this.app.path.app)}/${time
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
}
