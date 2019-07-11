let mysql = require('mysql');
let config = require('../knexfile');

let conn = mysql.createConnection(config.connection);
const knex = require('knex')(config);

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


function searchProfile(request, response) {
    knex('users').where({ id: request.params.empID }).
    then(data => {
        response.json(data[0])
    }).catch(error => {
        console.log(error);
        response.json({
            status: "error"
        });
    })
}


function updateProfile(request, response) {
    let password = request.body.password;
    bcrypt.hash(password, 10, function(err, hashedPassword) {
        knex('users')
        .where({ id: request.params.empID })
        .update({

            name: request.body.name,
            address: request.body.address,
            contact: request.body.contact,
            email: request.body.email,
            username: request.body.username,
            password: hashedPassword
        })
        .then(data => {
            response.statusCode = 200;
            response.json({
                status: "Profile Updated",
                error: false
            })

        })
        .catch(error => {
            console.log(error);
            response.json({
                status: "error",
                error: true
            });
        })
    });
}

function updateProfileAndroid(request, response) {
    let password = request.body.password;
    bcrypt.hash(password, 10, function(err, hashedPassword) {
        knex('users')
        .where({ id: request.params.empID })
        .update({
            name: request.body.name,
            address: request.body.address,
            contact: request.body.contact,
            email: request.body.email,
            username: request.body.username,
            path: request.body.imageName,
            password: hashedPassword
        })
        .then(data => {
            response.statusCode = 200;
            response.json({
                status: "Profile Updated",
                error: false
            })

        })
        .catch(error => {
            console.log(error);
            response.json({
                status: "error",
                error: true
            });
        })
    });
}

function updateProfilePicture(request, response) {
    knex('users')
    .where({ id: request.params.empID })
    .update({
        path: request.body.path
    })
    .then(data => {
        response.statusCode = 200;
        response.json({
            status: "Profile Updated",
            error: false
        })

    })
    .catch(error => {
        console.log(error);
        response.json({
            status: "error",
            error: true
        });
    })
    
}


module.exports = {
    "updateProfile": updateProfile,
    "updateProfileAndroid": updateProfileAndroid,
    "updateProfilePicture": updateProfilePicture,
    "searchProfile": searchProfile
}