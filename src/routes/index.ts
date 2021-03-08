import { Router } from "express"
import root from "./root";
import cache from "./cache";

const router = Router();

router.use("", root);
router.use("", cache);

export default router;
