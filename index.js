require('dotenv').config();
require('express-async-errors');
const tasks = require('./routes/tasks');
const users = require('./routes/users');
const auth = require('./routes/auth');
const express = require('express');
const mongoose = require('mongoose');
const errorMidd = require('./middleware/error.moddleware');
const logger = require('./logs/winston.logs')
const app = express();

// errors outside of express
process.on('uncaughtException', (ex) => {
    logger.error(ex.message,ex);
    process.exit(1);
})

// unhendled rejection ( for async code )
process.on('unhandledRejection', (ex) => {
    logger.error(ex.message,ex);
    process.exit(1);
})

// Connection
mongoose.connect(process.env.DB_CONNECTION_URL)
    .then(() => console.log("connected to mongodb ..."))
    .catch((err) => console.error("can't connect ...",err))

app.use(express.json());

// Router
app.use('/tasks', tasks);
app.use('/users', users);
app.use('/auth', auth);
app.use(errorMidd);

// For testing
app.get('/', (req, res) => {
    res.send("Hello from Task Manager");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));