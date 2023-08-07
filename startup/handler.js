require('express-async-errors');
const {dbLogger,consoleLogger} = require('../logs/winston.logs');

module.exports = function() {
    // errors outside of express
    process.on('uncaughtException', (ex) => {
        dbLogger.error(ex.message,ex);
        consoleLogger.error(err.message,err);
        process.exit(1);
    })

    // unhendled rejection ( for async code )
    process.on('unhandledRejection', (ex) => {
        dbLogger.error(ex.message,ex);
        consoleLogger.error(err.message,err);
        process.exit(1);
    })
}