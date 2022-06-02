import _ from "lodash";
import { Database } from "../database/Database";
import { Mail } from "../lib/Mail/Mail";

export interface IAutoLoadOptions {
    mail?: boolean;
    db?: boolean;
}

export class AutoLoadConfig {
    private static autoLoad: IAutoLoadOptions = {
        mail: false,
        db: false,
    };

    public static update(autoLoad: IAutoLoadOptions): void {
        this.autoLoad = _.extend(this.autoLoad, autoLoad);
    }

    public static async run() {
        if (this.autoLoad.mail) Mail.conn();
        if (this.autoLoad.db) Database.conn();
    }
}
