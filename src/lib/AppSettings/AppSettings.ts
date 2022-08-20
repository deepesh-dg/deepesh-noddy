import { existsSync, readFileSync } from "fs";

export const appSettings = () => {
    if (!existsSync("noddy-settings.json")) return false;

    const rawdata = readFileSync("noddy-settings.json", "utf-8");
    const setting = JSON.parse(rawdata);

    return setting;
};
