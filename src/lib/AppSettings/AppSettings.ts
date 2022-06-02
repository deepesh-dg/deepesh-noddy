import { readFileSync } from "fs";

export const appSettings = () => {
    const rawdata = readFileSync("noddy-settings.json", "utf-8");
    const setting = JSON.parse(rawdata);

    return setting;
};
