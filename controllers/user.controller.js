const { userServices } = require('../services');
const {
    messages
} = require('../config');
const {
    status
} = require('../config');
const { passwordServices } = require('../services');
const { userNormalizator } = require('../utils/user.util');

const {
    createNewUser,
    readAllUsers,
    updateUser,
    deleteUser
} = userServices;

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const getAllUsers = await readAllUsers(req.query);
            const userToReturn = getAllUsers.map((user) => userNormalizator(user));

            res.json(userToReturn);
        } catch (e) {
            next(e);
        }
    },

    postCreateUser: async (req, res, next) => {
        try {
            const { password } = req.body;

            const hashedPassword = await passwordServices.hash(password);

            const createUser = await createNewUser({
                ...req.body,
                password: hashedPassword
            });

            const userToReturn = userNormalizator(createUser);

            res.status(status.CREATE_OR_UPDATE).json(userToReturn);
        } catch (e) {
            next(e);
        }
    },

    getUserId: (req, res, next) => {
        try {
            res.json(req.user);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            await updateUser(user_id, req.body);

            res.status(status.CREATE_OR_UPDATE).json(messages.UPDATED_USER);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            await deleteUser(user_id);

            res.status(status.DELETE).json(messages.DELETED_USER);
        } catch (e) {
            next(e);
        }
    }
};
