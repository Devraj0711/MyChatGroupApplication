const path = require('path');

const express = require('express');

const ChatScreenController = require('../chatApp_controllers/chatScreen_controller');

const router = express.Router();

router.get('/Message/chatScreen', ChatScreenController.getChatScreen);
router.get('/Message/showChat', ChatScreenController.getScreen);

router.post('/Message/chatScreen', ChatScreenController.postChatScreen);

// router.get('/password/forgetPassword', LoginController.getPassword)

module.exports = router;
