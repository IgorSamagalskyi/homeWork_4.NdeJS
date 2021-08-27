const router = require('express').Router();

const { userController } = require('../controllers');

const {
    isEmail,
    isUserValid,
    isUserExist
} = require('../middlewares/user.middleware');

router.get('/', userController.getUsers);
router.post('/', isEmail, isUserValid, userController.postCreateUser);
router.get('/:user_id', isUserExist, userController.getUserId);
router.put('/:user_id', isUserExist, userController.updateUser);
router.delete('/:user_id', isUserExist, userController.deleteUser);

module.exports = router;
