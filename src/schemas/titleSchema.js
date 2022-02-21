import joi from "joi";

const titleSchema = joi.object({
    title: joi.string().required()
}).unknown(true);

export default titleSchema;