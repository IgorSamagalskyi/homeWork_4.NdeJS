const { compare } = require('../services/password.services');
const { FORM } = require('../config/messages');
const { userNormalizator } = require('../utils/user.util');

module.exports = {
    showForm: (req, res, next) => {
        try {
            res.json(FORM);
        } catch (e) {
            next(e);
        }
    },

    loginUser: async (req, res, next) => {
        try {
            const { user, password } = req;

            const userResponse = await compare(user.password, password);

            const userToReturn = userNormalizator(userResponse);

            res.json(userToReturn);
        } catch (e) {
            next(e);
        }
    }
};
