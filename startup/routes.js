const tasks = require('../routes/tasks');
const users = require('../routes/users');
const auth = require('../routes/auth');
const express = require('express');
const errorMidd = require('../middleware/error.moddleware');

module.exports = function(app) {
    app.use(express.json());
    // Router
    app.use('/tasks', tasks);
    app.use('/users', users);
    app.use('/auth', auth);
    // Error routes midd
    app.use(errorMidd);
}