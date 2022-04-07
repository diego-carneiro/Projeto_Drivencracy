import { Router } from "express";
import { createPool, getPools, getVotes  } from "../controllers/poolsController.js";
import titleMiddleware from "../middlewares/titleMiddleware.js"

const poolsRouter = Router();

poolsRouter.post("/pool", titleMiddleware, createPool);
poolsRouter.get("/pool", getPools);
poolsRouter.get("/pool/:id/result", getVotes);

export default poolsRouter;