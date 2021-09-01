const { UsersModel } = require('../dataBase');
const ErrorHandler = require('../errorHandler/ErrorHandler');
const {
    userValidator: {
        createUserValidator,
        updateUser
    }
} = require('../validators');
const {
    messages: {
        EMAIL_EXIST,
        USER_NOT_FOUND,
        FORBIDDEN_MESSAGES
    },
    status: {
        FORBIDDEN,
        NOT_FOUND,
        BAD_REQUEST,
        UNAUTHORIZED_ERROR
    }
} = require('../config');

module.exports = {
    isEmail: async (req, res, next) => {
        try {
            const { email } = req.body;

            const isEmailExist = await UsersModel.findOne({ email });

            if (isEmailExist) {
                throw new ErrorHandler(UNAUTHORIZED_ERROR, EMAIL_EXIST);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    validateUserBody: (req, res, next) => {
        try {
            const { error } = createUserValidator.validate(req.body);

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
            const { error } = updateUser.validate(req.body);

            if (error) {
                throw new ErrorHandler(BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserRoleMiddleware: (rolesArr = []) => (req, res, next) => {
        try {
            const { role } = req.user;

            if (!rolesArr.length) {
                return next();
            }

            if (!rolesArr.includes(role)) {
                throw new ErrorHandler(FORBIDDEN, FORBIDDEN_MESSAGES);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    getUserByDynamicParam: (paramName, searchIn = 'body', dbFiled = paramName) => async (req, res, next) => {
        try {
            const value = req[searchIn][paramName];

            const currentUser = await UsersModel.findById({ [dbFiled]: value });

            if (!currentUser) {
                throw new ErrorHandler(NOT_FOUND, USER_NOT_FOUND);
            }

            req.user = currentUser;

            next();
        } catch (e) {
            next(e);
        }
    }
};
