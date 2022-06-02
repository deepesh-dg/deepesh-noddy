import { BaseConf } from "./BaseConf";

export class Config extends BaseConf {
    private static config: { [key: string]: any } = {};
    private static configObj = new Config();

    public static get(keys?: string): any {
        return this.configObj.get(this.config, keys);
    }

    public static set(keys: string, value: any): void {
        this.config = this.configObj.set(this.config, keys, value);
    }

    public static setAll(config: { [key: string]: any }): void {
        this.config = this.configObj.setAll(this.config, config);
    }
}
