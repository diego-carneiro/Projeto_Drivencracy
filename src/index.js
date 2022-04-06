import express, { json } from "express";
import cors from 'cors';
import dotenv from 'dotenv';


dotenv.config();
const server = express();
server.use(cors());
server.use(json());
server.use(poolsRouter);
server.use(choicesRouter);


server.listen(process.env.PORT, () => {
    console.log(`Running at http://localhost:${process.env.PORT}`);
});
