const Joi = require('joi');

const { PASSWORD_REGEXP, EMAIL_REGEXP } = require('../config/const');

const authValidator = Joi.object({
    name: Joi.string().alphanum().min(2).max(30)
        .trim()
        .required(),
    email: Joi.string().regex(EMAIL_REGEXP).required(),
    password: Joi.string().regex(PASSWORD_REGEXP).required()
});

module.exports = {
    authValidator
};
