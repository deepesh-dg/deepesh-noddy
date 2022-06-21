import { AutoLoadConfig } from "./conf/AutoLoad";
import { Config } from "./conf/Config";
import { DBConfig } from "./conf/DB";
import { MailConfig } from "./conf/Mail";

import { ResponseApi } from "./lib/Api/Response";
import { Logger } from "./lib/Log/Logger";
import { Mail } from "./lib/Mail/Mail";
import { promiseHandle } from "./lib/PromiseHandler/PromiseHandler";
import { httpStatusCodes } from "./prototypes/enums/httpStatusCodes";

/**
 * Making Custom Exporting Structure
 */
export const lib = {
    api: { ResponseApi },
    log: { Logger },
    mail: Mail,
    promiseHandle,
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

/**
 * Exporting Directly
 */
export { bootstrap } from "./app";
export { Router } from "./router/Router";
export { Controller } from "./controllers/Controller";
export { IMailConfig } from "./lib/Mail/Mail";
export { ErrorFlag } from "./prototypes/type/Error";
export { SuccessFlag } from "./prototypes/type/Success";
export { HttpHeaders } from "./prototypes/type/Headers";
