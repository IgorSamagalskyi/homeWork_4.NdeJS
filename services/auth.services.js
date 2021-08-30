const UsersModel = require('../dataBase/Users');

module.exports = {
    findByEmail: (email) => UsersModel.findOne(email),
};
