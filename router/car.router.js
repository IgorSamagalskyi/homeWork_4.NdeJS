const router = require('express').Router();

const { carController } = require('../controllers');

const {
    carMiddleware: {
        isCarValid,
        getCarByDynamicParam,
        validateCarBodyUpdate
    }
} = require('../middlewares');

router.get('/', carController.getCars);
router.post('/', isCarValid, carController.postCreateCar);
router.get('/:car_id', getCarByDynamicParam(
    'car_id',
    'params',
    '_id'
), carController.getCarId);
router.put('/:car_id', getCarByDynamicParam(
    'car_id',
    'params',
    '_id'
), validateCarBodyUpdate, carController.updateCar);
router.delete('/:car_id', getCarByDynamicParam(
    'car_id',
    'params',
    '_id'
), carController.deleteCar);

module.exports = router;
