const path = require('path');

const express = require('express');

const ChatScreenController = require('../chatApp_controllers/chatScreen_controller');

const router = express.Router();

router.get('/Message/chatScreen', ChatScreenController.getChatScreen);
router.get('/Message/showJoinedMember', ChatScreenController.getScreen);
router.get('/Message/showmessage', ChatScreenController.showmessage);


router.post('/Message/chatScreen', ChatScreenController.postChatScreen);

// router.get('/password/forgetPassword', LoginController.getPassword)

module.exports = router;
