const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/users_controller');

// router.get('/home',userController.home); // manual auth code

router.get('/home',passport.checkAuthentication,userController.home);

router.get('/signUpUser',userController.signUp);
router.get('/signInUser',userController.signIn);
router.post('/create',userController.create);
// router.post('/create-session',userController.create_session); // manual auth code
router.get('/destroy-session',userController.destroy_session);

router.post('/create-session',passport.authenticate(
    'local',
    {
        failureRedirect : '/users/signInUser'
    }
),userController.create_session);

module.exports = router;