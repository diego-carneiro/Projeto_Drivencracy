import express, { json } from "express";
import cors from 'cors';
import dotenv from 'dotenv';

import { createPool, getPools, getVotes  } from "./controllers/poolsController.js";
import { createChoice, getChoices, vote } from "./controllers/choicesController.js"

dotenv.config();
const server = express();
server.use(cors());
server.use(json());


server.post("/pool", createPool);

server.get("/pool", getPools);

server.post("/choice", createChoice);

server.get("/pool/:id/choice", getChoices);

server.post("/choice/:id/vote", vote);

server.get("/pool/:id/result", getVotes);

server.listen(5000, () => {
    console.log("Running at http://localhost:5000");
});







// const currentDay = dayjs().locale("pt-br");
// console.log(currentDay, "HOJE");
// const expirationDay = currentDay.add("30", "day").toISOString();
// console.log(expirationDay, "expirou");
