const router = require('express')
    .Router();

const { userController } = require('../controllers');

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
router.get('/:user_id', getUserByDynamicParam(
    'user_id',
    'params',
    '_id'
),
checkUserRoleMiddleware([
    'admin',
    'user'
]),
userController.getUserId);
router.put('/:user_id', validateUserBodyUpdate, getUserByDynamicParam(
    'user_id',
    'params',
    '_id'
), userController.updateUser);
router.delete('/:user_id',
    getUserByDynamicParam(
        'user_id',
        'params',
        '_id'
    ),
    checkUserRoleMiddleware(['admin']),
    userController.deleteUser);

module.exports = router;
