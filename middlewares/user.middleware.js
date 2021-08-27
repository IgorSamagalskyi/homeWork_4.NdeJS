const UserModel = require('../dataBase/Users');
const ErrorHandler = require('../errorHandler/ErrorHandler');
const {
    EMPTY_FIELDS,
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

    isUserValid: (req, res, next) => {
        try {
            const {
                name,
                email
            } = req.body;

            if (!name || !email) {
                throw new ErrorHandler(BAD_REQUEST, EMPTY_FIELDS);
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

            next();
        } catch (e) {
            next(e);
        }
    }
};
