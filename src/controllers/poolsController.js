import joi from "joi";
import dayjs from "dayjs";
import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();

const titleSchema = joi.object({
    title: joi.string().required()
}).unknown(true);

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;
mongoClient.connect().then(() => {
    db = mongoClient.db("API_Drivencracy");
});

export async function createPool(request, response) {
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
};

export async function getPools(request, response) {
    try {
        const pools = await db.collection("pools").find({}).toArray();

        response.send(pools);
    } catch (error) {
        console.log(error, "Error getting pools");
        response.sendStatus(500);
    }
    console.log(currentDay);
};
