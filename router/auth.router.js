const router = require('express').Router();

const { authController } = require('../controllers');

const {
    authMiddleware: {
        validateData,
        isUserEmail
    }
} = require('../middlewares');

router.get('/',
    authController.showForm);

router.post('/', validateData, isUserEmail,
    authController.loginUser);

module.exports = router;
