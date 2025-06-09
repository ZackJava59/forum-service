import Joi from "joi";

const schemas = {
    createPost: Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        tags: Joi.array().items(Joi.string()),
    }),

    addComment: Joi.object({
        message: Joi.string().required(),
    }),

    updatePost: Joi.object({
        title: Joi.string(),
        content: Joi.string(),
        tags: Joi.array().items(Joi.string()),
    }),

    datePeriod: Joi.object({
        dateFrom: Joi.date().required(),
        dateTo: Joi.date().greater(Joi.ref('dateFrom')).required(),
    })
}

const validate = (schemaName) => {
    return (req, res, next) => {
        const schema = schemas[schemaName];

        if (!schema) {
            return next(new Error(`Schema ${schemaName} not found`));
        }

        const data = schemaName === 'datePeriod'
            ? req.query
            : req.body;
        const {error} = schema.validate(data);

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