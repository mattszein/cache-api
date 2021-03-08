import { Router, Request, Response } from "express";

const router = Router();

// @route GET /
// @desc default page
// @access PUBLIC
router.get("/", (req: Request, res: Response) => {
	res.send("Cache Api:");
});

export default router
