import { connect } from "mongoose";
import { DBConfig } from "../../../core/conf/DB";
import { promiseHandle } from "../../lib/PromiseHandler/PromiseHandler";

export class MongoDB {
    public static async conn() {
        const result = await promiseHandle(connect(DBConfig.get("mongodbUrl")));

        return result;

        // result.map( success => resolve( "Successfully Connected To The Database..." ))
        // .mapErr( error => reject("Database Connection Failed..."))
    }
}
