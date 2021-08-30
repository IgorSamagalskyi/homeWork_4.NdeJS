const Joi = require('joi');

const { PASSWORD_REGEXP, EMAIL_REGEXP } = require('../config/const');
const userRolesEnum = require('../config/usersRoles.enum');

const createUserValidator = Joi.object({
    name: Joi.string().alphanum().min(2).max(30)
        .trim()
        .required(),
    password: Joi.string().regex(PASSWORD_REGEXP).trim().required(),
    email: Joi.string().regex(EMAIL_REGEXP).trim().required(),
    role: Joi.string().allow(...Object.values(userRolesEnum)),
});

const updateUser = Joi.object({
    name: Joi.string().alphanum().min(2).max(30)
        .trim(),
    email: Joi.string().regex(EMAIL_REGEXP).trim()
});

module.exports = {
    createUserValidator,
    updateUser
};
