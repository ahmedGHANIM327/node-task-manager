const mongoose = require('mongoose');
const {dbLogger} = require('../logs/winston.logs');

module.exports = function() {
    mongoose.connect(process.env.DB_CONNECTION_URL)
        .then(() => dbLogger.info("connected to mongodb ..."))
}