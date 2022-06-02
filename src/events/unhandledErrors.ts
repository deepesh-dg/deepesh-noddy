import { Logger } from "../lib/Log/Logger";

const debug: Logger = new Logger({ moduleName: "noddy:unhandledErrors" });

export const unhandledErrors = () => {
    process.on("uncaughtException", (err: Error) => {
        debug.debug("UnExpected Error -> ", err.message);
    });
    process.on("unhandledRejection", (err) => {
        debug.debug("UnExpected Rejection ->", err);
    });
};
