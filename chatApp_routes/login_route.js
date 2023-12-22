const path = require('path');

const express = require('express');

const LoginController = require('../chatApp_controllers/login_controller');

const router = express.Router();

// /admin/Login => GET

router.get('/', LoginController.getSignup);
router.post('/Login/signup', LoginController.postAddSignupDetails);

router.get('/Login/signin', LoginController.getSignin);
router.post('/Login/signin', LoginController.PostSignin);


// router.get('/password/forgetPassword', LoginController.getPassword)

module.exports = router;
