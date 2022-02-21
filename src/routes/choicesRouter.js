import { Router } from "express";

import { createChoice, getChoices, vote } from "../controllers/choicesController.js"

const choiceRouter = Router();

choiceRouter.post("/choice", createChoice);
choiceRouter.get("/pool/:id/choice", getChoices);
choiceRouter.post("/choice/:id/vote", vote);

export default choiceRouter;