// Вам необхідно реалізувати CRUD на дві сутності (user, car)
// Мають бути реалізовані такі методи:
// 1) Create user
// 2) Get all users
// 3) Get user by id
// 4) Delete current user
// 5) Update user
//
// Все це має бути розбито по роутах, контроллерах, сервісах з обовязковою перевіркою всього що приходить через мідлвари.
//     Також всі меджік стрінги мають бути винесені в константи.
//     додати errorHandler
const express = require('express');
const mongoose = require('mongoose');

const app = express();

const { PORT, MONGODB_PORT } = require('./config/variables');

mongoose.connect(MONGODB_PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const {
    userRouter,
    carRouter
} = require('./router');

app.use('/users', userRouter);
app.use('/cars', carRouter);
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
        status: err.status || 404,
        message: err.message || 'Not found'
    });
}

// eslint-disable-next-line no-unused-vars
function _errorHandler(err, req, res, next) {
    res
        .status(err.status || 500)
        .json({
            message: err.message
        });
}
