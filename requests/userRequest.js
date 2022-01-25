import Joi from '@hapi/joi';

export default (requestData, id = 0) => {
    const schema = Joi.object({
        first_name: Joi.string().required().messages({
            'string.base': `first name should be a type of 'text'`,
            'string.empty': `first name cannot be an empty field`,
            'any.required': `first name is a required field`
        }),
        middle_name: Joi.string().required().messages({
            'string.base': `middle name should be a type of 'text'`,
            'string.empty': `middle name cannot be an empty field`,
            'any.required': `middle name is a required field`
        }),
        last_name: Joi.string().required().messages({
            'string.base': `last name should be a type of 'text'`,
            'string.empty': `last name cannot be an empty field`,
            'any.required': `last name is a required field`
        }),
        email_id: Joi.string().email().required().messages({
            'string.base': `email should be a type of 'text'`,
            'string.email': `email should be a type of 'email'`,
            'string.empty': `email cannot be an empty field`,
            'any.required': `email is a required field`
        }),
        mobile_no: Joi.string().required().messages({
            'string.base' : `mobile no should be a type of 'text'`,
            'string.empty': `mobile no cannot be an empty field`,
            'any.required': `mobile no is a required field`
        }),
        password: (!id) ? Joi.string().required().min(8).messages({
            'string.base': `password should be a type of 'text'`,
            'string.min' : `password length must be at least 8 characters`,
            'string.empty': `password cannot be an empty field`,
            'any.required': `password is a required field`
        }) :
        Joi.string().allow('').min(8).messages({
            'string.base': `profile image should be a type of 'text'`,
            'string.base': `password should be a type of 'text'`,
            'string.min' : `password length must be at least 8 characters`
        }),
        role_id: Joi.number().min(1).required().messages({
            'number.base' : `role id should be a type of 'number'`,
            'number.empty': `role id cannot be an empty field`,
            'number.min'  : `role id length must be at least 1 characters`,
            'any.required': `role id is a required field`
        })
    });
    return schema.validate(requestData, {abortEarly: false});
}