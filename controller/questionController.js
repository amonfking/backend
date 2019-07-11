let mysql = require('mysql');
let config = require('../knexfile');

let conn = mysql.createConnection(config.connection);
const knex = require('knex')(config);
const jwt_auth = require('../helper/authentication');

function fetchQuestions(request, response) {
    console.log("data");
    knex.select('*').from('questions').
    then(data => {
        response.statusCode = 200;
        response.json(data)
    }).catch(error => {
        console.log(error);
        response.statusCode = 403;
        response.json({
            status: "error"
        });
    })
}

module.exports = {
    "fetchQuestions": fetchQuestions
}