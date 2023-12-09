const path = require('path');

const express = require('express');

const HomeController = require('../chatApp_controllers/home_controllers');

const router = express.Router();

// /admin/home => GET

router.get('/', HomeController.getSignup);
router.post('/Home/signup', HomeController.postAddDetails);

// router.get('/Home/signin',HomeController.getSignin);
// router.post('/Home/signin',HomeController.PostSignin);

// router.get('/password/forgetPassword', HomeController.getPassword)

module.exports = router;
