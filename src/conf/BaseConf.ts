import _ from "lodash";

export class BaseConf {
    protected get(object: any, keys?: string): any {
        let result: any = object;

        if (keys) result = _.get(result, keys);

        return result;
    }

    protected set(object: any, keys: string, value: any): any {
        return _.set(object, keys, value);
    }

    protected setAll(object: any, config: { [key: string]: any }): any {
        if (_.isObject(config as any)) {
            for (const key in config) {
                if (Object.prototype.hasOwnProperty.call(config, key))
                    object[key] = config[key];
            }
        }

        return object;
    }
}
