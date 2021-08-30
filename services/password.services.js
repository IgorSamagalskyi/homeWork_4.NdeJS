const bcrypt = require('bcrypt');

const ErrorHandler = require('../errorHandler/ErrorHandler');
const { BAD_REQUEST } = require('../config/statusСodes');
const { EMAIL_OR_PASSWORD_WRONG } = require('../config/messages');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),

    compare: async (hash, password) => {
        const isPasswordMatched = await bcrypt.compare(password, hash);

        if (!isPasswordMatched) {
            throw new ErrorHandler(BAD_REQUEST, EMAIL_OR_PASSWORD_WRONG);
        }
    }
};
