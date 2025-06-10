import Joi from 'joi';

const schemas = {
    addUser: Joi.object({
        login: Joi.string().required(),
        password: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
    }),

    updateUser: Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
    }),

    addRole: Joi.object({
        login: Joi.string().required(),
        roles: Joi.array().items(Joi.string()),
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