const router = require('express').Router();

const { carController } = require('../controllers');

const {
    isCarValid,
    isCarExist
} = require('../middlewares/car.middleware');

router.get('/', carController.getCars);
router.post('/', isCarValid, carController.postCreateCar);
router.get('/:car_id', isCarExist, carController.getCarId);
router.put('/:car_id', isCarExist, carController.updateCar);
router.delete('/:car_id', isCarExist, carController.deleteCar);

module.exports = router;
