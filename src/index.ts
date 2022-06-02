import { AutoLoadConfig } from "./conf/AutoLoad";
import { Config } from "./conf/Config";
import { DBConfig } from "./conf/DB";
import { MailConfig } from "./conf/Mail";

import { ResponseApi } from "./lib/Api/Response";
import { Logger } from "./lib/Log/Logger";
import { Mail } from "./lib/Mail/Mail";
import { promiseHandle } from "./lib/PromiseHandler/PromiseHandler";
import { httpStatusCodes } from "./prototypes/enums/httpStatusCodes";
import { bootstrap as Nbootstrap } from "./app";
import { Controller as NController } from "./controllers/Controller";
import { Router as NRouter } from "./router/Router";

export const lib = {
    api: { ResponseApi },
    log: { Logger },
    mail: Mail,
    promiseHandle: promiseHandle,
};
export const conf = {
    AutoLoadConfig,
    Config,
    DBConfig,
    MailConfig,
};
export const prototypes = {
    httpStatusCodes,
};
export const bootstrap = Nbootstrap;
export const Controller = NController;
export const Router = NRouter;
