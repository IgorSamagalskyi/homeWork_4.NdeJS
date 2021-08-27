const { userServices } = require('../services');
const { UPDATED_USER, DELETED_USER } = require('../config/messages');

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
            const createUser = await createNewUser(req.body);

            res.json(createUser);
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
// if (!repeatEmail) {
//     users.push(req.body);
//     await createNewUser(users);
//     res.redirect('/login');
// }
// res.status(401).send('This email is already registered');
