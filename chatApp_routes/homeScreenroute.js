const path = require('path');

const express = require('express');

const HomeScreenController = require('../chatApp_controllers/homeScreen_controller');

const router = express.Router();

router.get('/Message/homeScreen', HomeScreenController.getHomeScreen)
router.get('/Message/home', HomeScreenController.showContactScreen);
router.get('/Message/home/:name', HomeScreenController.showChat);

router.get('/Message/addGroup', HomeScreenController.addGroup);
router.post('/Message/addGroup', HomeScreenController.post_addGroup);

//to show the home page of GroupChat Screen 
router.get('/Message/groupchatScreen/:groupName', HomeScreenController.get_Groupchat)
// to show the joined members and group Name on the screen
router.get('/Message/groupchatScreen/showMembers/:groupName', HomeScreenController.show_GroupMembers)

router.get('/Message/groupchatScreen/showMessage/:userid/:groupName', HomeScreenController.show_userMessage)

//to store group message in db
router.post('/Message/groupchatScreen', HomeScreenController.post_Groupchat)
module.exports = router;
