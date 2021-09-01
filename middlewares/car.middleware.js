const {
    CarsModel
} = require('../dataBase');
const ErrorHandler = require('../errorHandler/ErrorHandler');
const {
    carValidator: {
        createCarValidator,
        updateCarValidator
    }
} = require('../validators');

const {
    messages: {
        CAR_NOT_FOUND
    },
    status: {
        BAD_REQUEST,
        NOT_FOUND
    }
} = require('../config');

module.exports = {
    isCarValid: (req, res, next) => {
        try {
            const { error } = createCarValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    validateCarBodyUpdate: (req, res, next) => {
        try {
            const { error } = updateCarValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    getCarByDynamicParam: (paramName, searchIn = 'body', dbFiled = paramName) => async (req, res, next) => {
        try {
            const value = req[searchIn][paramName];

            const currentCars = await CarsModel.findById({ [dbFiled]: value });

            if (!currentCars) {
                throw new ErrorHandler(NOT_FOUND, CAR_NOT_FOUND);
            }

            req.car = currentCars;

            next();
        } catch (e) {
            next(e);
        }
    }
};
