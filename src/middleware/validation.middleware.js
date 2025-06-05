import joi from 'joi';
import Joi from "joi";

const schemas = {
    createPost: joi.object({
        title: joi.string().required(),
        content: joi.string().required(),
        tags: joi.array().items(Joi.string()),
    }),

    addComment: joi.object({
        message: joi.string().required(),
    }),

    updatePost: joi.object({
        title: joi.string(),
        content: joi.string(),
        tags: joi.array().items(Joi.string()),
    })
}

const validate = (schemaName) => {
    return (req, res, next) => {
        const schema = schemas[schemaName];

        if (!schema) {
            return next(new Error(`Schema ${schemaName} not found`));
        }

        const {error} = schema.validate(req.body);

        if (error) {
            return res.status(400).send({
                code: 400,
                status: 'Bad Request',
                message: error.details[0].message,
                path: req.path
            })
        }
        next();
    }
}

export default validate;