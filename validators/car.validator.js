const Joi = require('joi');

const { constConfig } = require('../config');

const { CURRENT_YEAR } = constConfig;
const { carModelsEnum } = require('../config');

const createCarValidator = Joi.object({
    model: Joi.string().allow(...Object.values(carModelsEnum)).required(),
    price: Joi.string().min(10000).max(3000000)
        .trim()
        .required(),
    year: Joi.number().min(CURRENT_YEAR - 50).max(CURRENT_YEAR).required()
});

const updateCarValidator = Joi.object({
    model: Joi.string().allow(...Object.values(carModelsEnum)),
    price: Joi.string().min(10000).max(3000000)
        .trim(),
    year: Joi.number().min(CURRENT_YEAR - 100).max(CURRENT_YEAR)
});

module.exports = {
    createCarValidator,
    updateCarValidator
};
