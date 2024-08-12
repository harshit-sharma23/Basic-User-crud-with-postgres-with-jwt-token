const express = require('express');
const app = express();

const authMiddleware = require('./../middleware/auth.middleware');

const auth = require('./auth.route');
const employee = require('./employees.route');

//Unrestricted Route
app.use('/auth', auth);

//Restricted Route
app.use('/employee', authMiddleware, employee);

module.exports = app;
