const CarsModel = require('../dataBase/Cars');
const ErrorHandler = require('../errorHandler/ErrorHandler');
const {
    EMPTY_FIELDS,
    CAR_NOT_FOUND
} = require('../config/messages');
const {
    BAD_REQUEST,
    NOT_FOUND
} = require('../config/statusСodes');

module.exports = {
    isCarValid: (req, res, next) => {
        try {
            const {
                model,
                year,
                price
            } = req.body;

            if (!model || !year || !price) {
                throw new ErrorHandler(BAD_REQUEST, EMPTY_FIELDS);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isCarExist: async (req, res, next) => {
        try {
            const { car_id } = req.params;

            const currentUser = await CarsModel.findById(car_id);

            if (!currentUser) {
                throw new ErrorHandler(NOT_FOUND, CAR_NOT_FOUND);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
