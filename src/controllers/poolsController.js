import dayjs from "dayjs";
import { ObjectId } from "mongodb";
import db from "../db.js";

export async function createPool(request, response) {
    const pool = request.body;
    const defaultExpiration = dayjs().add("30", "day").utc().local().format("YYYY-MM-DD HH:mm");

    try {

        if (pool.expireAt === "") {
            pool.expireAt = defaultExpiration;
        }

        const res = await db.collection("pools").insertOne(pool);
        const createdPool = await db.collection("pools").findOne({ _id: res.insertedId })

        response.status(201).send(createdPool);
    } catch (error) {
        console.log(error, "Error posting pool");
        response.sendStatus(500);
    }
};

export async function getPools(_request, response) {
    try {
        const pools = await db.collection("pools").find({}).toArray();

        response.send(pools);
    } catch (error) {
        console.log(error, "Error getting pools");
        response.sendStatus(500);
    }
};

export async function getVotes(request, response) {
    const id = request.params.id;
    let result = {};
    let arrResults = [];

    try {
        const pool = await db.collection("pools").findOne({ _id: new ObjectId(id) });
        const choices = await db.collection("choices").find({ poolId: id }).toArray();
        const votes = await db.collection("votes").find({}).toArray();

        for (let i = 0; i < choices.length; i++) {
            result = {};
            let votesTotal = 0
            for (let j = 0; j < votes.length; j++) {

                if (choices[i]._id.toString() === votes[j].choiceId.toString()) {
                    votesTotal++

                    result = {
                        title: choices[i].title,
                        votes: votesTotal,
                    }
                }
            }
            arrResults.push(result);
        }
        let auxCount = arrResults[0].votes;
        let topIndex = 0;

        for (let index = 0; index < arrResults.length; index++) {

            if (arrResults[index].votes > auxCount) {
                auxCount = arrResults[index].votes;
                topIndex = index;
            }
        }

        response.send({
            ...pool,
            result: arrResults[topIndex]
        });
    } catch (error) {
        console.log(error, "Error getting result");
        response.sendStatus(500);
    }
};

