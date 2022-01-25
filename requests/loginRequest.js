import Joi from '@hapi/joi';

export default (requestData) => {
    const schema = Joi.object({
        email_id: Joi.string().email().required().messages({
            'string.base': `email should be a type of 'text'`,
            'string.email': `email should be a type of 'email'`,
            'string.empty': `email cannot be an empty field`,
            'any.required': `email is a required field`
        }),
        password: Joi.string().required().messages({ //.min(8)
            'string.base': `password should be a type of 'text'`,
            'string.empty': `password cannot be an empty field`,
            'any.required': `password is a required field`
        })
    });
    return schema.validate(requestData, {abortEarly: false});
}