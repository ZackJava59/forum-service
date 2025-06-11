import Joi from 'joi';

const schemas = {
    register: Joi.object({
        login: Joi.string().required(),
        password: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
    }),

    updateUser: Joi.object({
        firstName: Joi.string(),
        lastName: Joi.string(),
    }),

    changeRoles: Joi.object({
        role: Joi.string().valid('User', 'Moderator', 'Admin'),
        login: Joi.string().required(),
    })
}

const validate = (schemaName, target = 'body') => {
    return (req, res, next) => {
        const schema = schemas[schemaName];

        if (!schema) {
            return next(new Error(`Schema ${schemaName} not found`));
        }

        const {error} = schema.validate(req[target]);

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