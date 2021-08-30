const UserModel = require('../dataBase/Users');
const ErrorHandler = require('../errorHandler/ErrorHandler');
const userValidator = require('../validators');
const {
    EMAIL_EXIST,
    USER_NOT_FOUND
} = require('../config/messages');
const {
    BAD_REQUEST,
    UNAUTHORIZED_ERROR,
    NOT_FOUND
} = require('../config/statusСodes');

module.exports = {
    isEmail: async (req, res, next) => {
        try {
            const { email } = req.body;

            const isEmailExist = await UserModel.findOne({ email });

            if (isEmailExist) {
                throw new ErrorHandler(UNAUTHORIZED_ERROR, EMAIL_EXIST);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserExist: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            const currentUser = await UserModel.findById(user_id);

            if (!currentUser) {
                throw new ErrorHandler(NOT_FOUND, USER_NOT_FOUND);
            }

            req.user = currentUser;
            next();
        } catch (e) {
            next(e);
        }
    },

    validateUserBody: (req, res, next) => {
        try {
            const { error } = userValidator.userValidator.createUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    validateUserBodyUpdate: (req, res, next) => {
        try {
            const { error } = userValidator.userValidator.updateUser.validate(req.body);

            if (error) {
                throw new ErrorHandler(BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
