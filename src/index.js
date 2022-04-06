import express, { json } from "express";
import cors from 'cors';
import router from "./routes/index.js"
import dotenv from "dotenv";

const server = express();
server.use(cors());
server.use(json());
server.use(router);

dotenv.config();

server.listen(process.env.PORT, () => {
    console.log(`Running at http://localhost:${process.env.PORT}`);
});
