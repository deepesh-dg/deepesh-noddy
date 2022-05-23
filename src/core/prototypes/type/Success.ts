import { httpStatusCodes } from "../enums/httpStatusCodes";
import { HttpHeaders } from "./Headers";

export type SuccessFlag = {
    status: httpStatusCodes;
    headers: HttpHeaders;
    body: any;
};
