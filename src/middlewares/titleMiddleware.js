import titleSchema from "../schemas/titleSchema.js";

export default function validateMovementSchemaMiddleware(request, response, next) {
    const validation = titleSchema.validate(request.body, { abortEarly: false });
    
    if (validation.error) {
        return response.status(422).send(validation.error.details);
    }

    next();
}