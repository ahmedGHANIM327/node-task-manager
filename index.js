require('dotenv').config();
const express = require('express');
const app = express();

// unhendled rejection ( for async code ) && errors outside of express
require('./startup/handler')();

// Routes
require('./startup/routes')(app);

// DB connexion
require('./startup/db-connexion')();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));