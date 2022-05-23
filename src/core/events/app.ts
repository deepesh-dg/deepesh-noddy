import { AddressInfo } from "net";
import Debug, { Debugger } from "debug";
import { Server } from "http";
import { HttpError } from "http-errors";
import { Config } from "../conf/Config";

const debug: Debugger = Debug("core:events:app");

/**
 * Event listener for HTTP server "error" event.
 */
export const onError = (error: HttpError): void => {
    if (error.syscall !== "listen") {
        throw error;
    }

    const bind =
        typeof Config.get("port") === "string"
            ? "Pipe " + Config.get("port")
            : "Port " + Config.get("port");

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            debug(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            debug(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
};

/**
 * Event listener for HTTP server "listening" event.
 */
export const onListening = (server: Server): void => {
    const addr: AddressInfo | string | null = server.address();
    let bind: string = "";

    if (typeof addr === "string") bind = `pipe ${addr}`;
    else if (addr !== null) bind = `port ${addr.port}`;

    debug("Listening on " + bind);
};
