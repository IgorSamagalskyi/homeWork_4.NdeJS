const ErrorHandler = require('../errorHandler/ErrorHandler');
const { authServices } = require('../services');
const { authValidator } = require('../validators');
const {
    BAD_REQUEST
} = require('../config/statusСodes');
const {
    WRONG_PASSWORD_OR_EMAIL
} = require('../config/messages');

module.exports = {
    isUserEmail: async (req, res, next) => {
        try {
            const { email } = req.body;

            const isUserPresent = await authServices.findByEmail({ email });

            if (!isUserPresent) {
                throw new ErrorHandler(BAD_REQUEST, WRONG_PASSWORD_OR_EMAIL);
            }
            req.user = isUserPresent;

            next();
        } catch (e) {
            next(e);
        }
    },

    validateData: (req, res, next) => {
        try {
            const { error } = authValidator.authValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(BAD_REQUEST, WRONG_PASSWORD_OR_EMAIL);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
