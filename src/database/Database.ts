import { Logger } from "../lib/Log/Logger";
import { MongoDB } from "./mongodb/MongoDB";

const debug: Logger = new Logger({ moduleName: "noddy:database" });

export class Database {
    public static async conn() {
        const result = await MongoDB.conn();

        result
            .map(() => debug.debug("Successfully Connected To The Database..."))
            .mapErr(() => debug.debug("Database Connection Failed..."));
    }
}
