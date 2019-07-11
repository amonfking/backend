let mysql = require('mysql');
let config = require('../knexfile');

let conn = mysql.createConnection(config.connection);
const knex = require('knex')(config);

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const jwt_auth = require('../helper/authentication');

function insertUser(request, response) {
    let password = request.body.password;
    bcrypt.hash(password, 10, function(err, hashedPassword) {
        knex('users')
            .insert({
                name: request.body.name,
                address: request.body.address,
                contact: request.body.contact,
                email: request.body.email,
                username: request.body.username,
                usertype: request.body.usertype,
                password: hashedPassword
            }).then(data => {
                response.statusCode = 200;
                response.json({
                    status: "Member Inserted",
                    success: true,
                    error: false
                })
            }).catch(error => {
                console.log(error);
                res.statusCode = 403;
                response.json({
                    status: "error"
                });
            })
    });
}

function signupUser(request, response) {
	console.log("asd");
    let password = request.body.password;
    bcrypt.hash(password, 10, function(err, hashedPassword) {
        knex('users')
            .insert({
                name: request.body.name,
                address: request.body.address,
                contact: request.body.contact,
                email: request.body.email,
                username: request.body.username,
                usertype: request.body.usertype,
                password: hashedPassword
            }).then(data => {
                const token = jwt.sign({username:request.body.username},'secret');
                response.statusCode = 200;
                response.setHeader('Content-Type', 'application/json');
                response.json({ 
                    success: true,
                    error: false,
                    status: 'Member inserted',
                    // data: data[0],
                    accessToken: token,
                    id: data[0],
                    usertype: request.body.usertype
                });

            }).catch(error => {
                console.log(error);
                res.statusCode = 403;
                response.json({
                    status: "error"
                });
            })
    });
}

function fetchUsers(request, response) {
    knex.select('*').from('users').
    then(data => {
        response.json(data)
    }).catch(error => {
        console.log(error);
        response.json({
            status: "error"
        });
    })
}

function getHelp(request, response) {
    knex.select('*').from('help').orderBy('helpid').
    then(data => {
    	console.log(data);
        response.json(data)
    }).catch(error => {
        console.log(error);
        response.json({
            status: "error"
        });
    })
}

function searchUser(request, response) {
    if (jwt_auth._authenticate(request.headers.authorization) === false) {
        jwt_auth.notAuthenticated(response);
        return;
    }
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

function loginUser(request, response) {
    const username = request.body.username;
    const password = request.body.password;
    knex('users').where({ username: username }).
    then(data => {
        bcrypt.compare(password, data[0].password, function(err, res) {
            if (res) {
                const token = jwt.sign({username:username},'secret');
                response.statusCode = 200;
                response.setHeader('Content-Type', 'application/json');
                response.json({ 
                    success: true,
                    status: 'You are successfully logged in!',
                    data: data[0],
                    accessToken: token,
                    id: data[0].id,
                    usertype: data[0].usertype
                });
            } else {
                console.log("erroe")
                response.json({
                    status: "error",
                    success: false
                });
            }
        });

    }).catch(error => {
        console.log(error);
        response.json({
            status: "error",
            success: false
        });
    })


}



function updateUser(request, response) {
    if (jwt_auth._authenticate(request.headers.authorization) === false) {
        jwt_auth.notAuthenticated(response);
        return;
    }
    knex('users')
        .where({ id: request.params.empID })
        .update({
            name: request.body.name,
            address: request.body.address,
            contact: request.body.contact,
            email: request.body.email,
            username: request.body.username
        })
        .then(data => {
            response.statusCode = 200;
            response.json({
                status: "Member Updated",
                success: true,
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

function deleteUser(request, response) {
    if (jwt_auth._authenticate(request.headers.authorization) === false) {
        jwt_auth.notAuthenticated(response);
        return;
    }
    knex('users')
        .where('id', request.params.empID)
        .del()
        .then(data => {
            response.json({
                success: true,
                status: "deleted"
            })

        })
        .catch(error => {
            console.log(error);
            response.json({
                status: "error"
            });
        })
}



module.exports = {
    "insertUser": insertUser,
    "signupUser": signupUser,
    "updateUser": updateUser,
    "deleteUser": deleteUser,
    "searchUser": searchUser,
    "loginUser": loginUser,
    "getHelp": getHelp,
    "fetchUsers": fetchUsers
}