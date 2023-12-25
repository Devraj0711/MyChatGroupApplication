const Login_page = require('../models/signup_db');

const StoreMessage_page= require('../models/storeMessage');

const fs = require('fs');
const path = require('path');
const { Op } = require('sequelize');

const bcrypt= require('bcrypt');

const jwt= require('jsonwebtoken');

//chatScreen page

exports.getChatScreen= async(req, res, next)=> {
    try {
        const userList = await Login_page.findAll();
        
       
        // Send both JSON data and HTML content as the response
        res.sendFile(path.join(__dirname, '..', 'view', 'Message', 'chatScreen.html'));
        // res.status(200).send(userList);

        // res.setHeader('Content-Type', 'application/json');
        // res.status(200).json(userList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }    
    
};

exports.getScreen= async(req, res, next)=> {
    try {
        const userList = await Login_page.findAll();

        

        res.status(200).send(userList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }    
};

exports.showmessage= async(req, res, next)=>{
    try {
        const ShowMessage = await StoreMessage_page.findAll();

        

        res.status(200).send(ShowMessage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }    
}

exports.postChatScreen=async(req, res, next) =>{
    const user_message= req.body.message;
    const user_id= req.body.user_id;
    console.log("can you seee the message---",user_message); 
    console.log("id of current user --- ", user_id); 
    const Username = await Login_page.findOne({ where: { id: user_id } });
    const userMessage = await StoreMessage_page.create({
        message: user_message,
        Username:Username.name,
        SignupDbId: user_id
      });
    
    
    // const fullUserMessage = await StoreMessage_page.findAll();

    
    
    res.status(200).json({ Message: 'Message received successfully'});
};