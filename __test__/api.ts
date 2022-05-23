import app from "../src/bin/www";
import request from "supertest";
import { apiAuth } from "./__conf";
import { Logger } from "../src/core/lib/Log/Logger";

jest.setTimeout(60000);

export type ApiOptions = {
    name: string;
    url: string;
    method: "get" | "post" | "put" | "patch" | "delete";
    headers?: { [key: string]: string };
    data?: any;
    expect: number;
    then?: (res: request.Response) => void;
};

export const api = (config: ApiOptions) => {
    const debug: Logger = new Logger({ moduleName: `test:${config.name}` });

    test(config.name, async () => {
        await request(app)
            [config.method](`/api/${config.url}`)
            .set({ ...apiAuth, ...config.headers })
            .send(config.data ?? {})
            .expect(config.expect)
            .then(
                config.then ??
                    function (res) {
                        debug.debug("headers", res.headers);
                        debug.debug("body", res.body);
                    }
            );
    });
};
