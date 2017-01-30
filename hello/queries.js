const promise = require('bluebird');

const options = {
    promiseLib: promise
};

const pgp = require('pg-promise')(options);
const connectionString = 'postgres://localhost:5432/markdown';
const db = pgp(connectionString);

// functions go here

module.exports = {
    "somekey": somefunction
};

