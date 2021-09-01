const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

const {
    messages: { NOT_FOUND_MESSAGES },
    status: { NOT_FOUND, SERVER_ERROR },
    variables: { PORT, MONGODB_PORT }
} = require('./config');

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
        status: err.status || NOT_FOUND,
        message: err.message || NOT_FOUND_MESSAGES
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
