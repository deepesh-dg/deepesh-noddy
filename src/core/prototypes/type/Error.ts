import { httpStatusCodes } from "../enums/httpStatusCodes";
import { HttpHeaders } from "./Headers";

export type ErrorFlag = {
    status: httpStatusCodes;
    headers: HttpHeaders;
    body: {
        name?: string;
        message: string | string[];
        data?: any;
    };
};
