const router = require('express').Router();

const { authController } = require('../controllers');

const {
    isUserEmail,
    validateData
} = require('../middlewares/auth.middleware');

router.get('/', authController.showForm);
router.post('/', validateData, isUserEmail, authController.loginUser);

module.exports = router;
