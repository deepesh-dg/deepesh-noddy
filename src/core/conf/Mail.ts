import { BaseConf } from "./BaseConf";

export class MailConfig extends BaseConf {
    private static mailConfig: { [key: string]: any } = {};
    private static mailConfigObj = new MailConfig();

    public static get(keys?: string): any {
        return this.mailConfigObj.get(this.mailConfig, keys);
    }

    public static set(keys: string, value: any): void {
        this.mailConfig = this.mailConfigObj.set(this.mailConfig, keys, value);
    }

    public static setAll(config: { [key: string]: any }): void {
        this.mailConfig = this.mailConfigObj.setAll(this.mailConfig, config);
    }
}
