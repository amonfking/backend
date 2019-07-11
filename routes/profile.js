var express = require('express');

var router = express.Router();
const profile = require('../controller/profileController');

router.get('/:empID', profile.searchProfile);
router.put('/:empID', profile.updateProfile);
router.put('/android/:empID', profile.updateProfileAndroid);
router.put('/upload/:empID', profile.updateProfilePicture);

module.exports = router;