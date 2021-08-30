const { userServices } = require('../services');
const {
    UPDATED_USER,
    DELETED_USER
} = require('../config/messages');
const {
    CREATE_OR_UPDATE,
    DELETE
} = require('../config/statusСodes');
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
            const allUsers = await readAllUsers(req.query);
            // const normalizedUsers = allUsers.map((user) => userNormalizator(user));

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

            res.status(CREATE_OR_UPDATE).json(userToReturn);
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

            res.status(CREATE_OR_UPDATE).json(UPDATED_USER);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            await deleteUser(user_id);

            res.status(DELETE).json(DELETED_USER);
        } catch (e) {
            next(e);
        }
    }
};
