
var express = require('express');

var router = express.Router();
const question = require('../controller/questionController');

router.get('/', question.fetchQuestions);


module.exports = router;

