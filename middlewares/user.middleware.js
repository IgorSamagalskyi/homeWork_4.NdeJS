const { UsersModel } = require('../dataBase');
const ErrorHandler = require('../errorHandler/ErrorHandler');
const { userValidator } = require('../validators');
const {
    messages
} = require('../config');
const {
    status
} = require('../config');

module.exports = {
    isEmail: async (req, res, next) => {
        try {
            const { email } = req.body;

            const isEmailExist = await UsersModel.findOne({ email });

            if (isEmailExist) {
                throw new ErrorHandler(status.UNAUTHORIZED_ERROR, messages.EMAIL_EXIST);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserExist: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            const currentUser = await UsersModel.findById(user_id);

            if (!currentUser) {
                throw new ErrorHandler(status.NOT_FOUND, messages.USER_NOT_FOUND);
            }

            req.user = currentUser;
            next();
        } catch (e) {
            next(e);
        }
    },

    validateUserBody: (req, res, next) => {
        try {
            const { error } = userValidator.createUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(status.BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    validateUserBodyUpdate: (req, res, next) => {
        try {
            const { error } = userValidator.updateUser.validate(req.body);

            if (error) {
                throw new ErrorHandler(status.BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
