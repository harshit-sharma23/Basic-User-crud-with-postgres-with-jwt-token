const express = require('express');
const app = express();
const auth = require('./../controller/auth.controller');

app.post('/sign-in', auth.signIn);
app.post('/sign-up', auth.signUp);

module.exports = app;
