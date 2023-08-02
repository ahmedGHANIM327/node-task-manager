require('dotenv').config();
const tasks = require('./routes/tasks');
const users = require('./routes/users');
const auth = require('./routes/auth');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// Connection
mongoose.connect(process.env.DB_CONNECTION_URL)
    .then(() => console.log("connected to mongodb ..."))
    .catch((err) => console.error("can't connect ...",err))

// Tasks Router
app.use('/tasks', tasks);
app.use('/users', users);
app.use('/auth', auth);

// For testing
app.get('/', (req, res) => {
    res.send("Hello from Task Manager");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));