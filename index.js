const Express = require('express');
var bodyParser = require("body-parser");
var cors = require('cors');
var path = require('path');

// create an express instance/object
const express = new Express();
express.use(Express.json()); // same as bodyParser.json()
express.use(Express.urlencoded({ extended: false }));
express.use(Express.static(path.join(__dirname, 'public')));
express.use("/public", Express.static(__dirname + '/public'));
express.use(cors());
express.use(bodyParser.json());
express.options('*', cors());

const userRouter = require('./routes/user');
const questionRouter = require('./routes/question');
const profileRouter = require('./routes/profile');
var uploadRouter = require('./routes/upload');
const profile = require('./controller/userController');
// create new user
express.get('/api/login', rootHandler);
express.get('/help', profile.getHelp);

express.use('/user', userRouter);

// Position
express.use('/question', questionRouter);

// Profile
express.use('/profile', profileRouter);
express.post('/profile/upload', uploadRouter);


// mount the handler to the route
express.get('/test', rootHandler);
// create a route handler
function rootHandler(request, response) {
    response.json({ "test": "OK" });
}


// listen for connection
express.listen(3000, 'localhost', () => console.log("successfully running on 3000 port"));
