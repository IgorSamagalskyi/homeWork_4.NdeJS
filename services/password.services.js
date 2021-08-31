const bcrypt = require('bcrypt');

const ErrorHandler = require('../errorHandler/ErrorHandler');
const { status } = require('../config');
const { messages } = require('../config');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),

    compare: async (hash, password) => {
        const isPasswordMatched = await bcrypt.compare(password, hash);

        if (!isPasswordMatched) {
            throw new ErrorHandler(status.BAD_REQUEST, messages.EMAIL_OR_PASSWORD_WRONG);
        }
    }
};
