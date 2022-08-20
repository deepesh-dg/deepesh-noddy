export function normalizePort(val: number): number | false {
    if (!isNaN(val) && val >= 0 && val < 100000) return val;

    return false;
}
