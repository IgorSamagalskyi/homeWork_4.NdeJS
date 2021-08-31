// Вам необхідно покрити всі місця, де це необхідно валідаторами JOI (query, params, body).
//
//     Зробити хешування паролів
//
// Зробити заготовку для флоу аутернтифікації. Тобто роут, контроллер, мідлвари і так далі
// https://www.youtube.com/watch?v=NO8rRUk_G_I&t=5700s

const express = require('express');
const mongoose = require('mongoose');

const app = express();

const {
    PORT,
    MONGODB_PORT
} = require('./config/variables');
const {
    NOT_FOUND,
    SERVER_ERROR
} = require('./config/statusСodes');

mongoose.connect(MONGODB_PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const {
    userRouter,
    authRouter,
    carRouter
} = require('./router');

app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/car', carRouter);
app.use('*', _notFoundError);
app.use(_errorHandler);

// Home
app.get('/', (req, res) => res.json('Home page'));

// test page
app.get('/ping', (req, res) => res.json('Pong'));

// Port
app.listen(PORT, () => {
    console.log('app listen ', PORT);
});

function _notFoundError(err, req, res, next) {
    next({
        status: err.status || NOT_FOUND,
        message: err.message || NOT_FOUND
    });
}

// eslint-disable-next-line no-unused-vars
function _errorHandler(err, req, res, next) {
    res
        .status(err.status || SERVER_ERROR)
        .json({
            message: err.message
        });
}
