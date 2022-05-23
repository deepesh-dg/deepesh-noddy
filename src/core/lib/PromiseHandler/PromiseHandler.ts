import { err, ok } from "neverthrow";

export const promiseHandle = async <T>(promise: Promise<T>) => {
    return promise.then((result) => ok(result)).catch((error) => err(error));
};
