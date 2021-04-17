const express = require('express');
const router = express.Router();

const eventController = require('../controllers/event_controller');

router.post('/createEvent',eventController.createEvent);

module.exports = router;