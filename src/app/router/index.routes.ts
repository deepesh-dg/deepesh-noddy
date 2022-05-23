import { Router } from "../../core/router/Router";
import welcome from "./welcome";

const router: Router = new Router();

router.use({ path: "/welcome", router: welcome });

export default router;
