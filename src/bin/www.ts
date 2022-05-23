import bootup from "../core/start/start";
bootup();

import app from "../app";
import { Logger } from "../core/lib/Log/Logger";
import { Config } from "../core/conf/Config";
import { createServer, Server } from "http";
// import { createServer as httpsCreateServer, ServerOptions } from "https";
// import { join } from "path";
// import { readFileSync } from "fs-extra";
import { onError, onListening } from "../core/events/app";

const debug: Logger = new Logger({ moduleName: "www:server" });

/**
 * Set port from environment and store in Express.
 */
app.set("port", Config.get("port"));
debug.debug("Port set");

/**
 * Listen on provided port, on all network interfaces.
 */
const httpServer: Server = createServer(app);
debug.debug("HTTP Server Created");

/**
 * Setting Default http server
 */
const server = httpServer;

/**
 * Creating HTTPS Secure Server
 */
// const httpsServerOptions: ServerOptions = {
//     key: readFileSync(join(__dirname, "../../keys/key.pem")),
//     cert: readFileSync(join(__dirname, "../../keys/cert.pem")),
//     // ca: ''
// };
// const httpsServer: Server = httpsCreateServer(httpsServerOptions, app);
// debug.debug("HTTPS Server Created");

/**
 * Creating HTTP2 Secure Server
 */
// const http2ServerOptions: SecureServerOptions = {
//     key: readFileSync(join(__dirname, "../../keys/key.pem")),
//     cert: readFileSync(join(__dirname, "../../keys/cert.pem")),
// }
// const http2Server: Server = createSecureServer(http2ServerOptions, app);
// debug("HTTP2 Server Created");

/**
 * Configuring http, https or http2 server
 */
// if (Config.get("https")) {
//     server = httpsServer;
//     debug.debug("HTTPS Server is going to run...");
// }
// if(config.http2) {
//     server = http2Server;
//     debug("HTTP2 Server is going to run...");
// }

server.listen(Config.get("port"));
server.on("error", onError);
server.on("listening", () => onListening(server));

debug.debug("App Started...");

export default app;
