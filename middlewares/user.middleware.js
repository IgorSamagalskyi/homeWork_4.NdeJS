const UserModel = require('../dataBase/Users');
const ErrorHandler = require('../errorHandler/ErrorHandler');
const {
    EMPTY_FIELDS,
    EMAIL_EXIST,
    USER_NOT_FOUND
} = require('../config/messages');

module.exports = {
    isEmail: async (req, res, next) => {
        try {
            const { email } = req.body;

            const isEmailExist = await UserModel.findOne({ email });

            if (isEmailExist) {
                throw new ErrorHandler(401, EMAIL_EXIST);
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
                throw new ErrorHandler(400, EMPTY_FIELDS);
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
                throw new ErrorHandler(404, USER_NOT_FOUND);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
