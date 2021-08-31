const { passwordServices } = require('../services');
const { messages } = require('../config');
const { userNormalizator } = require('../utils/user.util');

module.exports = {
    showForm: (req, res, next) => {
        try {
            res.json(messages.FORM);
        } catch (e) {
            next(e);
        }
    },

    loginUser: async (req, res, next) => {
        try {
            const { user } = req;
            const { password } = req.body;

            await passwordServices.compare(user.password, password);

            const userToReturn = userNormalizator(user);

            res.json(userToReturn);
        } catch (e) {
            next(e);
        }
    }
};
