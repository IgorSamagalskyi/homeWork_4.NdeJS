const ErrorHandler = require('../errorHandler/ErrorHandler');
const { authServices } = require('../services');
const {
    authValidator: {
        authValidator
    }
} = require('../validators');
const {
    status: {
        BAD_REQUEST
    },
    messages:
        {
            WRONG_PASSWORD_OR_EMAIL
        }
} = require('../config');

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
            const { error } = authValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(BAD_REQUEST, WRONG_PASSWORD_OR_EMAIL);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
