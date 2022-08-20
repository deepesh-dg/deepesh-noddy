import { readFileSync } from "fs";

const appVersion = (): number => {
    const packageFile = readFileSync("package.json", "utf-8");
    const appPackage = JSON.parse(packageFile);

    return appPackage.version as number;
};

export default appVersion;
