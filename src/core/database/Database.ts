import { Logger } from "../lib/Log/Logger";
import { MongoDB } from "./mongodb/MongoDB";

const debug: Logger = new Logger({ moduleName: "core:database" });

export class Database {
    public static async conn() {
        const result = await MongoDB.conn();

        result
            .map((success) =>
                debug.debug("Successfully Connected To The Database...")
            )
            .mapErr((error) => debug.debug("Database Connection Failed..."));
    }
}
