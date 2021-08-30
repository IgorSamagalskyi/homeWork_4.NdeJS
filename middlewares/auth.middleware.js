const ErrorHandler = require('../errorHandler/ErrorHandler');
const { authServices } = require('../services');
const { authValidator } = require('../validators/auth.validator');
const {
    BAD_REQUEST,
    NO_SUCH_EMAIL
} = require('../config/statusСodes');

module.exports = {
    isUserEmail: async (req, res, next) => {
        try {
            const { email } = req.body;

            const isUserPresent = await authServices.findByEmail({ email });

            if (!isUserPresent) {
                throw new ErrorHandler(BAD_REQUEST, NO_SUCH_EMAIL);
            }
            req.body.user = isUserPresent.toObject();

            next();
        } catch (e) {
            next(e);
        }
    },

    validateData: (req, res, next) => {
        try {
            const { error } = authValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
