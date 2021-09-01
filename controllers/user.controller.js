const {
    userServices: {
        createNewUser,
        readAllUsers,
        updateUser,
        deleteUser
    },
    passwordServices
} = require('../services');
const {
    messages: {
        UPDATED_USER,
        DELETED_USER
    },
    status: {
        DELETE,
        CREATE_OR_UPDATE
    }
} = require('../config');

const { userNormalizator } = require('../utils/user.util');

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
