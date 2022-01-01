const express = require('express');

const coinRouter = require('./api-routes/routes');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/coin', coinRouter);

module.exports = app;