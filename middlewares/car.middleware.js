const { CarsModel } = require('../dataBase');
const ErrorHandler = require('../errorHandler/ErrorHandler');
const {
    carValidator
} = require('../validators');

const {
    createCarValidator,
    updateCarValidator
} = carValidator;
const {
    messages
} = require('../config');
const {
    status
} = require('../config');

module.exports = {
    isCarValid: (req, res, next) => {
        try {
            const { error } = createCarValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(status.BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isCarExist: async (req, res, next) => {
        try {
            const { car_id } = req.params;

            const currentCar = await CarsModel.findById(car_id);

            if (!currentCar) {
                throw new ErrorHandler(status.NOT_FOUND, messages.CAR_NOT_FOUND);
            }

            req.car = currentCar;
            next();
        } catch (e) {
            next(e);
        }
    },

    validateUserBodyUpdate: (req, res, next) => {
        try {
            const { error } = updateCarValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(status.BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
