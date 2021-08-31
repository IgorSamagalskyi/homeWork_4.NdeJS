const {
    Schema,
    model
} = require('mongoose');

const { carModelsEnum } = require('../config');

const {
    MERCEDES,
    BMW,
    PORSCHE,
    MAZDA,
    TESLA
} = carModelsEnum;

const carSchema = new Schema({
    model: {
        type: String,
        required: true,
        default: MERCEDES,
        enum: [
            MERCEDES,
            BMW,
            PORSCHE,
            MAZDA,
            TESLA
        ],
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    year: {
        type: Number,
        required: true,
        trim: true
    }
}, { timestamps: true });

module.exports = model('Cars', carSchema);
