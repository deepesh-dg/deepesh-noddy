import { Config } from "../conf/Config";
import { normalizePort } from "../helpers/port/normalizePort";
import dotenv from "dotenv";
import appVersion from "../helpers/appVersion";
import { isDev } from "../helpers/env";
import { appSettings } from "../lib/AppSettings/appSettings";
import { resolve } from "path";

const run = async () => {
    /*
     * Setting Environment
     */
    Config.set(
        "production",
        process.env.NODE_ENV === "development" ? false : true
    );

    /**
     * Loading .env file for development env
     */
    if (isDev()) dotenv.config();

    /**
     * Setting up Rest Config
     */
    const config: { [key: string]: any } = {
        https:
            process.env.HTTPS === "on" || process.env.HTTPS === "true"
                ? true
                : false,
        port: normalizePort(Number(process.env.PORT)) || 5500,
        timezone: process.env.TZ ?? "Europe/London",
        app: {
            name: "@deepeshgupta/noddy",
            developedBy: "Deepesh Gupta",
            social: "https://www.twitter.com/deepeshdg_/",
            version: appVersion(),
        },
    };

    Config.setAll(config);

    const setting = appSettings();
    const conf = (
        await import(resolve(setting.path.app, setting.path.conf.conf))
    ).default;

    await conf();
};

export default run;
