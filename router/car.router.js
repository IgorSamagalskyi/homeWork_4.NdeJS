const router = require('express').Router();

const { carController } = require('../controllers');

const {
    carMiddleware
} = require('../middlewares');

router.get('/', carController.getCars);
router.post('/', carMiddleware.isCarValid, carController.postCreateCar);
router.get('/:car_id', carMiddleware.isCarExist, carController.getCarId);
router.put('/:car_id', carMiddleware.isCarExist, carController.updateCar);
router.delete('/:car_id', carMiddleware.isCarExist, carController.deleteCar);

module.exports = router;
