import { BaseConf } from "./BaseConf";

export class DBConfig extends BaseConf {
    private static DBConfig: { [key: string]: any } = {};
    private static DBConfigObj = new DBConfig();

    public static get(keys?: string): any {
        return this.DBConfigObj.get(this.DBConfig, keys);
    }

    public static set(keys: string, value: any): void {
        this.DBConfig = this.DBConfigObj.set(this.DBConfig, keys, value);
    }

    public static setAll(config: { [key: string]: any }): void {
        this.DBConfig = this.DBConfigObj.setAll(this.DBConfig, config);
    }
}
