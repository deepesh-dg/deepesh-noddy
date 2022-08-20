import mongoose from "mongoose";
import { DBConfig } from "../../conf/DB";
import { promiseHandle } from "../../lib/PromiseHandler/PromiseHandler";

export class MongoDB {
    public static async conn() {
        const result = await promiseHandle(
            mongoose.connect(DBConfig.get("url"))
        );

        return result;

        // result.map( success => resolve( "Successfully Connected To The Database..." ))
        // .mapErr( error => reject("Database Connection Failed..."))
    }
}
