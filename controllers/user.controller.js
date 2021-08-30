const { userServices } = require('../services');
const {
    UPDATED_USER,
    DELETED_USER
} = require('../config/messages');
const passwordService = require('../services/password.services');
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
            const allUsers = await readAllUsers(req.body);

            res.json(allUsers);
        } catch (e) {
            next(e);
        }
    },

    postCreateUser: async (req, res, next) => {
        try {
            const { password } = req.body;

            const hashedPassword = await passwordService.hash(password);

            const createUser = await createNewUser({
                ...req.body,
                password: hashedPassword
            });

            const userToReturn = userNormalizator(createUser);

            res.json(userToReturn);
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

            res.json(UPDATED_USER);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            await deleteUser(user_id);

            res.json(DELETED_USER);
        } catch (e) {
            next(e);
        }
    }
};
