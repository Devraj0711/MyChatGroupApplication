const path = require('path');

const express = require('express');

const ChatScreenController = require('../chatApp_controllers/chatScreen_controller');

const router = express.Router();

router.get('/Message/ChatScreen', ChatScreenController.getChatScreen);
router.get('/Message/showChat', ChatScreenController.getScreen);

// router.get('/password/forgetPassword', LoginController.getPassword)

module.exports = router;
