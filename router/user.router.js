const router = require('express').Router();

const { userController } = require('../controllers');

const {
    isEmail,
    isUserValid,
    isUserExist,
    validateUserBody,
    validateUserBodyUpdate
} = require('../middlewares/user.middleware');

router.get('/', userController.getUsers);
router.post('/', validateUserBody, isUserValid, isEmail, userController.postCreateUser);
router.get('/:user_id', isUserExist, userController.getUserId);
router.put('/:user_id', validateUserBodyUpdate, isUserExist, userController.updateUser);
router.delete('/:user_id', isUserExist, userController.deleteUser);

module.exports = router;
