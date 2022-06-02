import { err, ok } from "neverthrow";

export const promiseHandle = async (promise: Promise<any>) => {
    return promise.then((result) => ok(result)).catch((error) => err(error));
};
