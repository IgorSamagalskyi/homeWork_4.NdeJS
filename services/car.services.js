const CarsModel = require('../dataBase/Cars');

module.exports = {
    readAllCars: (arrCars) => CarsModel.find(arrCars),

    currentCar: (car_id) => CarsModel.findById(car_id),

    createNewCar: (car) => CarsModel.create(car),

    updateCar: (carId, carUpdate) => CarsModel.findByIdAndUpdate(carId, carUpdate),

    deleteCar: (carId) => CarsModel.findByIdAndDelete(carId)
};
