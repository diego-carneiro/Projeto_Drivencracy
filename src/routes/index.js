import { Router } from "express";
import poolsRouter from "./poolsRouter.js";
import choiceRouter from "./choicesRouter.js";

const router = Router();

router.use(poolsRouter);
router.use(choiceRouter);

export default router;