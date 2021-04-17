const express = require('express');
const router = express.Router();

const indexController = require('../controllers/index_controller');
const userController = require('../controllers/users_controller');

router.get('/',indexController.index);

router.use('/users',require('./users'));
router.use('/event',require('./event'));


module.exports = router;