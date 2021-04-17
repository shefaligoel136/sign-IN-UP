const express = require('express');
const router = express.Router();

const eventController = require('../controllers/event_controllers');

router.post('/createEvent',eventController.createEvent);

module.exports = router;