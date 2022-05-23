import { Config } from "../../core/conf/Config";
import { Logger } from "../../core/lib/Log/Logger";

const debug: Logger = new Logger({ moduleName: "app:conf:config" });

const run = () => {
    // Config.setAll({
    // authKey: process.env.AUTH_KEY ?? "CleanTax",
    // authSalt: process.env.AUTH_SALT ?? "CleanTax",
    // cloudinary: {
    //     cloudName: process.env.CLOUDINARY_CLOUD_NAME ?? '',
    //     apiKey: Number(process.env.CLOUDINARY_API_KEY),
    //     apiSecret: process.env.CLOUDINARY_API_SECRET ?? '',
    //     primaryDir: process.env.CLOUDINARY_PRIMARY_DIR ?? '',
    // },
    // appUrl: process.env.APP_URL?.split(",") ?? [],
    // });

    debug.debug("Environment", Config.get());

    /**
     * Configure CDN media - Coudinary
     */
    // cloudinary.config({
    //     cloud_name: Config.get("cloudinary.cloudName"),
    //     api_key: Config.get("cloudinary.apiKey"),
    //     api_secret: Config.get("cloudinary.apiSecre")
    // });
    // debug.debug("Cloudinary", cloudinary.config());
};

export default run;
