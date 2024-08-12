const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
require('./src/config/pg.db.config');
const { serverPort } = require('./src/config/env.config');
const mainRoute = require('./src/Router/main.route');

const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use('/', mainRoute);

app.listen(serverPort, () => {
    console.log(`Server is running on the port : ${serverPort}`);
});
