const winston = require('winston');
require('winston-mongodb');

const logger = winston.createLogger({
    level: 'error', // Log only 'error' level messages and above to MongoDB
    transports: [
      // Other transports (e.g., console, file) as needed
      new winston.transports.MongoDB({
        db: process.env.DB_CONNECTION_URL, // Replace with your MongoDB connection string
        level:'error',
        collection: 'logs', // The name of the collection where logs will be stored
        options: {
          useUnifiedTopology: true, // Recommended to use new MongoDB driver options
        },
      }),
    ],
});

module.exports = logger;