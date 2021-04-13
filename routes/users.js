const express = require('express');
const router = express.Router();

const userController = require('../controllers/users_controller');

router.get('/home',userController.home);

router.get('/signUpUser',userController.signUp);
router.get('/signInUser',userController.signIn);
router.post('/create',userController.create);
router.post('/create-session',userController.create_session);

module.exports = router;