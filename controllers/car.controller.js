const {
    carServices: {
        createNewCar,
        readAllCars,
        updateCar,
        deleteCar
    }
} = require('../services');
const {
    status: {
        CREATE_OR_UPDATE
    },
    messages: {
        UPDATED_CAR
    }
} = require('../config');
const { userNormalizator } = require('../utils/user.util');

module.exports = {
    getCars: async (req, res, next) => {
        try {
            const allCars = await readAllCars(req.body);
            const userToReturn = allCars.map((car) => userNormalizator(car));

            res.json(userToReturn);
        } catch (e) {
            next(e);
        }
    },

    postCreateCar: async (req, res, next) => {
        try {
            const createCar = await createNewCar(req.body);

            res.json(createCar);
        } catch (e) {
            next(e);
        }
    },

    getCarId: (req, res, next) => {
        try {
            res.json(req.car);
        } catch (e) {
            next(e);
        }
    },

    updateCar: async (req, res, next) => {
        try {
            const { car_id } = req.params;

            await updateCar(car_id, req.body);

            res.status(CREATE_OR_UPDATE).json(UPDATED_CAR);
        } catch (e) {
            next(e);
        }
    },

    deleteCar: async (req, res, next) => {
        try {
            const { car_id } = req.params;

            await deleteCar(car_id);
            res.json('Car deleted');
        } catch (e) {
            next(e);
        }
    }
};
