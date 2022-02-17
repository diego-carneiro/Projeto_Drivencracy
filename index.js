import express, { json } from "express";
import cors from 'cors';
import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
import joi from "joi";

dotenv.config();
const server = express();
server.use(cors());
server.use(json());

const titleSchema = joi.object({
    title: joi.string().required()
});

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;

mongoClient.connect().then(() => {
    db = mongoClient.db("API_Drivencracy");
});

server.post("/pool", async (request, response) => {
    const pool = request.body;
console.log(pool);
    try {
        // const validation = titleSchema.validate(request.body.title);

        // if (validation.error) {
        //     return response.status(422).send(validation.error.details);
        // }

        await db.collection("polls").insertOne(pool);

        response.sendStatus(201);
    } catch (error) {
        console.log(error, "Error posting pool");
        response.sendStatus(500);
    }
});

server.get("/pool", async (request, response) => {
    try {
        const pools = await db.collection("pools").find({}).toArray();
        response.sendStatus(200).send(pools);
    } catch (error) {
        console.log(error, "Error getting pools");
        response.sendStatus(500);
    }
});

server.listen(5000, () => {
    console.log("Running at http://localhost:5000");
});