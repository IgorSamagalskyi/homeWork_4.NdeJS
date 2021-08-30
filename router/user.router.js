const router = require('express').Router();

const { userController } = require('../controllers');

const {
    userMiddleware
} = require('../middlewares');

const {
    validateUserBody, isEmail, isUserExist, validateUserBodyUpdate
} = userMiddleware;

router.get('/', userController.getUsers);
router.post('/', validateUserBody, isEmail, userController.postCreateUser);
router.get('/:user_id', isUserExist, userController.getUserId);
router.put('/:user_id', validateUserBodyUpdate, isUserExist, userController.updateUser);
router.delete('/:user_id', isUserExist, userController.deleteUser);

module.exports = router;
