module.exports = {
    userNormalizator: (userToNormalize) => {
        const fieldsToRemove = [
            'password',
            '__v',
            '_id'
        ];

        const userNormalize = userToNormalize.toObject();

        fieldsToRemove.forEach((field) => {
            delete userNormalize[field];
        });

        return userNormalize;
    }
};
