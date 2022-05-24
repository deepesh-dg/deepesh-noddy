import { Router } from "../../core/router/Router";
import { Welcome } from "../controllers/Welcome";
import { WelcomeId } from "../controllers/Welcome[id]";

const router: Router = new Router();

router.use({ path: "/", controller: Welcome });
router.use({ path: "/:id", controller: WelcomeId });

export default router;
