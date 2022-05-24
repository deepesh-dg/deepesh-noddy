import { Config } from "../conf/Config";
import appConfig from "../../app/conf/Config";
import { normalizePort } from "../lib/Others/normalizePort";
import dotenv from "dotenv";

const run = () => {
    if (!Config.get("production")) dotenv.config();
    const config: { [key: string]: any } = {
        https:
            process.env.HTTPS === "on" || process.env.HTTPS === "true"
                ? true
                : false,
        http2:
            process.env.HTTP2 === "on" || process.env.HTTP2 === "true"
                ? true
                : false,
        production: process.env.NODE_ENV === "development" ? false : true,
        port: normalizePort(Number(process.env.PORT) || 5500),
        // authKey: process.env.AUTH_KEY ?? "Noddy",
        // authSalt: process.env.AUTH_SALT ?? "Noddy",
        timezone: process.env.TZ ?? "Europe/London",
        app: {
            name: "@deepeshgupta/noddy",
            developedBy: "Deepesh Gupta",
            social: "https://www.twitter.com/deepeshdg_/",
            version: 0.3,
        },
    };

    Config.setAll(config);
    appConfig();
};

export default run;
