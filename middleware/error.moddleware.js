const logger = require('../logs/winston.logs')

function errorMidd(err,req,res,next) {
    logger.error(err.message,err);
    res.status(500).send('Something failed !');
}

module.exports = errorMidd;