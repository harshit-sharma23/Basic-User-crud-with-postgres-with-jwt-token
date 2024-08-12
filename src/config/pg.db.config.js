const Pool = require('pg').Pool;
const { db } = require('../config/env.config');

const pool = new Pool({
    user: db.user,
    host: db.host,
    database: db.name,
    password: db.password,
    port: db.dbPort,
});

// Connect to the database
pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack);
    }
    console.log(`DB is successfully connected with ${db.name}`);
    release();
});

module.exports = pool;
