
var express = require('express');

var router = express.Router();
const user = require('../controller/userController');

router.post('/', user.insertUser);
router.post('/signup', user.signupUser);
router.get('', user.fetchUsers);
router.post('/login', user.loginUser);
router.get('/:empID', user.searchUser);
router.put('/:empID', user.updateUser);
router.delete('/:empID', user.deleteUser);

module.exports = router;