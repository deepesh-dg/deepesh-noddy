import { Result } from "neverthrow";
import { httpStatusCodes } from "../../prototypes/enums/httpStatusCodes";
import { SuccessFlag } from "../../prototypes/type/Success";
import { ErrorFlag } from "../../prototypes/type/Error";

export class ResponseApi {
    private static setHeaders<T>(headers: { [key: string]: T }): {
        [key: string]: T;
    } {
        let allowHeaders = "";

        for (const headerKey in headers) {
            if (Object.prototype.hasOwnProperty.call(headers, headerKey)) {
                if (allowHeaders) allowHeaders += `, ${headerKey}`;
                else allowHeaders += `${headerKey}`;
            }
        }

        Object.assign(headers, {
            "access-control-expose-headers": allowHeaders,
        });

        return headers;
    }

    public static make(
        result: Result<SuccessFlag, ErrorFlag>
    ): SuccessFlag | ErrorFlag {
        const response: SuccessFlag | ErrorFlag = {
            status: httpStatusCodes.INTERNAL_SERVER_ERROR,
            headers: {},
            body: {},
        };

        result
            .map((data) => {
                response.status = data.status || httpStatusCodes.OK;
                response.headers = this.setHeaders(data.headers);
                response.body = data.body;
            })
            .mapErr((error: ErrorFlag) => {
                response.status =
                    error.status || httpStatusCodes.INTERNAL_SERVER_ERROR;
                response.headers = this.setHeaders(error.headers);
                response.body = {
                    message: error.body.message,
                    data: error.body.data || {},
                };
            });

        return response;
    }

    public static fake(
        {
            status,
            headers,
            body,
        }: {
            status: httpStatusCodes;
            headers?: { [key: string]: string | string[] };
            body?: any;
        } = { status: httpStatusCodes.OK, headers: {}, body: {} }
    ) {
        if (status === undefined) status = httpStatusCodes.OK;
        if (headers === undefined) headers = {};
        const response: SuccessFlag = {
            status,
            headers,
            body,
        };
        return response;
    }
}
