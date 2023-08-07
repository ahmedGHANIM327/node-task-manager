const winston = require('winston');
require('winston-mongodb');

const dbLogger = winston.createLogger({
    level: 'error', // Log only 'error' level messages and above to MongoDB
    transports: [
      // Other transports (e.g., console, file) as needed
      new winston.transports.MongoDB({
        db: process.env.DB_CONNECTION_URL, // Replace with your MongoDB connection string
        collection: 'logs', // The name of the collection where logs will be stored
        options: {
          useUnifiedTopology: true, // Recommended to use new MongoDB driver options
        },
      }),
    ],
});

const consoleLogger = winston.createLogger({
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(), // Add color to the log output
          winston.format.simple() // Use a simple log format
        ),
      }),
    ],
});

module.exports.dbLogger = dbLogger;
module.exports.consoleLogger = consoleLogger;