import joi from "joi";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js"
import { MongoClient, ObjectId } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();
dayjs.extend(utc);

const titleSchema = joi.object({
    title: joi.string().required()
}).unknown(true);

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;
mongoClient.connect().then(() => {
    db = mongoClient.db("API_Drivencracy");
});

export async function createChoice(request, response) {
    const choice = request.body;
    const currentDay = dayjs.utc().local().format("YYYY-MM-DD HH:mm");

    try {
        const validation = titleSchema.validate(request.body);

        if (validation.error) {
            return response.status(422).send(validation.error.details);
        }

        const isCreated = await db.collection("pools").findOne({ _id: new ObjectId(choice.poolId) });
        
        if (!isCreated) {
            return response.sendStatus(404);
        }
        
        const expireDate = isCreated.expireAt;

        const diff = dayjs(expireDate).diff(currentDay, 'minutes')

        if (diff <= 0) {
            await db.collection("pools").deleteOne({ _id: new ObjectId(choice.poolId) })
        }

        const isRepeated = await db.collection("choices").findOne({ title: choice.title });
        // tem que arrumar;

        if (isRepeated) {
            return response.sendStatus(409);
        }

        const res = await db.collection("choices").insertOne(choice);

        const createdChoice = await db.collection("choices").findOne({ _id: res.insertedId })

        response.status(201).send(createdChoice);
    } catch (error) {
        console.log(error, "Error posting choice");
        response.sendStatus(500);
    }
};

export async function getChoices(request, response) {
    const id = request.params.id;

    try {
        const choices = await db.collection("choices").find({ poolId: id }).toArray();

        response.status(200).send(choices);
    } catch (error) {
        console.log(error, "Error getting pool's choices");
        response.sendStatus(500);
    }
}

export async function vote(request, response) {
    const choiceId = request.params.id;

    try {
        const currentDay = dayjs.utc().local().format("YYYY-MM-DD HH:mm");


        const choice = await db.collection("choices").findOne({ _id: new ObjectId(choiceId) });

        if (!choice) {
            return response.sendStatus(404);
        }


        const saveVote = await db.collection("votes").insertOne({
            createdAt: currentDay,
            choiceId: choiceId,
        });

        response.status(200).send(choice);
    } catch (error) {
        console.log(error, "Error getting pool's choices");
        response.sendStatus(500);
    }
}
