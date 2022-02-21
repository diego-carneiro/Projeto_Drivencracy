import { Router } from "express";

import { createPool, getPools, getVotes  } from "../controllers/poolsController.js";

const poolsRouter = Router();

poolsRouter.post("/pool", createPool);
poolsRouter.get("/pool", getPools);
poolsRouter.get("/pool/:id/result", getVotes);

export default poolsRouter;