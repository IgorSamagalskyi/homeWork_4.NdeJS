const { carServices } = require('../services');

const {
    createNewCar,
    readAllCars,
    updateCar,
    deleteCar
} = carServices;

module.exports = {
    getCars: async (req, res, next) => {
        try {
            const allCars = await readAllCars(req.body);

            res.json(allCars);
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
            res.json('Car updated');
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
