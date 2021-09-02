const router = require('express').Router();

const { carController } = require('../controllers');
const {
    constConfig: {
        CAR_ID,
        PARAMS,
        DB_ID_FIELD
    }
} = require('../config');
const {
    carMiddleware: {
        isCarValid,
        getCarByDynamicParam,
        validateCarBodyUpdate
    }
} = require('../middlewares');

router.get('/', carController.getCars);

router.post('/', isCarValid, carController.postCreateCar);

router.get('/:car_id',
    getCarByDynamicParam(CAR_ID, PARAMS, DB_ID_FIELD),
    carController.getCarId);

router.put('/:car_id',
    getCarByDynamicParam(CAR_ID, PARAMS, DB_ID_FIELD),
    validateCarBodyUpdate, carController.updateCar);

router.delete('/:car_id',
    getCarByDynamicParam(CAR_ID, PARAMS, DB_ID_FIELD),
    carController.deleteCar);

module.exports = router;
