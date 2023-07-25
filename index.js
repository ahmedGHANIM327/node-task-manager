const tasks = require('./routes/tasks');
const express = require('express');
const app = express();

app.use(express.json());

// Tasks Router
app.use('/tasks', tasks);

// For testing
app.get('/', (req, res) => {
    res.send("Hello from Task Manager");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
