const router = require('express')
    .Router();

const { userController } = require('../controllers');
const {
    constConfig: {
        USER_ID,
        PARAMS,
        DB_ID_FIELD
    }
} = require('../config');
const {
    userMiddleware: {
        validateUserBody,
        isEmail,
        getUserByDynamicParam,
        validateUserBodyUpdate,
        checkUserRoleMiddleware
    }
} = require('../middlewares');

router.get('/', userController.getUsers);

router.post('/', validateUserBody, isEmail, userController.postCreateUser);

router.get('/:user_id',
    getUserByDynamicParam(USER_ID, PARAMS, '_id'),
    userController.getUserId);

router.put('/:user_id', validateUserBodyUpdate,
    getUserByDynamicParam(USER_ID, PARAMS, '_id'),
    checkUserRoleMiddleware(['admin']),
    userController.updateUser);

router.delete('/:user_id',
    getUserByDynamicParam(USER_ID, PARAMS, DB_ID_FIELD),
    checkUserRoleMiddleware(['admin']),
    userController.deleteUser);

module.exports = router;
