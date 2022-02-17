import express, { json } from "express";
import cors from 'cors';
import { LoggerLevel, MongoClient } from "mongodb";
import dotenv from 'dotenv';
import joi from "joi";
import dayjs from "dayjs";

dotenv.config();
const server = express();
server.use(cors());
server.use(json());

const titleSchema = joi.object({
    title: joi.string().required()
}).unknown(true);

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;

mongoClient.connect().then(() => {
    db = mongoClient.db("API_Drivencracy");
});

server.post("/pool", async (request, response) => {
    const pool = request.body;

    try {
        const validation = titleSchema.validate(request.body);

        if (validation.error) {
            return response.status(422).send(validation.error.details);
        }

        const res = await db.collection("pools").insertOne(pool);
        const createdPool = await db.collection("pools").findOne({ _id: res.insertedId })

        response.status(201).send(createdPool);
    } catch (error) {
        console.log(error, "Error posting pool");
        response.sendStatus(500);
    }
});

server.get("/pool", async (request, response) => {
    try {
        const pools = await db.collection("pools").find({}).toArray();

        response.send(pools);
    } catch (error) {
        console.log(error, "Error getting pools");
        response.sendStatus(500);
    }
    console.log(currentDay);

});

server.listen(5000, () => {
    console.log("Running at http://localhost:5000");
});

server.post("/choice", async (request, response) => {
    const { poolId, title } = request.body;

    try {
        const validation = titleSchema.validate(request.body);
        
        if (validation.error) {
            return response.status(422).send(validation.error.details);
        }

        const isCreated = await db.collection("pools").findOne({ _id: poolId });

        // if (){}


        await db.collection("polls").insertOne(pool);

        response.sendStatus(201);
    } catch (error) {
        console.log(error, "Error posting pool");
        response.sendStatus(500);
    }
});










const currentDay = dayjs().locale("pt-br");
console.log(currentDay, "HOJE");
const expirationDay = currentDay.add("30", "day").toISOString();
console.log(expirationDay, "expirou");
console.log(expirationDay);