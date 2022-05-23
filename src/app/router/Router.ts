import cors from "cors";
// import { Config } from "../../core/conf/Config";
import { httpStatusCodes } from "../../core/prototypes/enums/httpStatusCodes";
import { Router } from "../../core/router/Router";
import { Index } from "../controllers/Index";
import index from "./index.routes";

const router: Router = new Router();

/**
 * Setting up CORS policy for app
 */
router.use({
    path: "",
    middlewares: cors({
        // origin: Config.get("appUrl"),
        optionsSuccessStatus: httpStatusCodes.OK,
    }),
});

router.use({ path: "/", controller: Index });
router.use({ path: "/api", router: index });

export default router;
