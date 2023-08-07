const {dbLogger,consoleLogger} = require('../logs/winston.logs')

function errorMidd(err,req,res,next) {
    dbLogger.error(err.message,err);
    consoleLogger.error(err.message,err);
    res.status(500).send('Something failed !');
}

module.exports = errorMidd;