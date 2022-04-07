import { Router } from "express";
import { createChoice, getChoices, vote } from "../controllers/choicesController.js"
import titleMiddleware from "../middlewares/titleMiddleware.js"

const choiceRouter = Router();

choiceRouter.post("/choice", titleMiddleware, createChoice);
choiceRouter.get("/pool/:id/choice", getChoices);
choiceRouter.post("/choice/:id/vote", vote);

export default choiceRouter;