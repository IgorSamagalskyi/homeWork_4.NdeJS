const UsersModel = require('../dataBase/Users');

module.exports = {
    readAllUsers: (arrUsers) => UsersModel.find(arrUsers),

    createNewUser: (user) => UsersModel.create(user),

    updateUser: (userId, userUpdate) => UsersModel.findByIdAndUpdate(userId, userUpdate),

    deleteUser: (userId) => UsersModel.findByIdAndDelete(userId)
};
