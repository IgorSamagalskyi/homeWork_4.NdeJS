const router = require('express').Router();

const { authController } = require('../controllers');

const {
    authMiddleware
} = require('../middlewares');

const {
    validateData, isUserEmail
} = authMiddleware;

router.get('/', authController.showForm);
router.post('/', validateData, isUserEmail, authController.loginUser);

module.exports = router;
