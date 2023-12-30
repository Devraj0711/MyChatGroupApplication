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
        const Uname= req.params.contactName
        console.log("URL last name ",Uname)
        res.status(200).send(Uname);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }    
};

exports.showmessage= async(req, res, next)=>{
try {
        const currentuserId= req.params.currentuserId;

        const selectedUsername= req.params.selectedUsername;

        console.log("current user id-", currentuserId);

        console.log("selected user name--", selectedUsername);

        const contactId= await Login_page.findOne({ where: { id: currentuserId} });

        console.log("contactId detail", contactId.name);
        const showMessage = await StoreMessage_page.findAll({
            where: {
                [Op.or]: [
                    {
                        
                        SignupDbId: currentuserId,
                        CurrentUsername: selectedUsername,
                    },
                    {
                        ContactUsername: selectedUsername,
                        CurrentUsername:contactId.name// Assuming CurrentUsername is a variable or value
                    }
                ]
            }
        });
        
          


        console.log(`messages of user ${currentuserId}`, showMessage)
        res.status(200).send(showMessage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }    
}

exports.postChatScreen=async(req, res, next) =>{
    try{
    const user_message= req.body.message;
    const user_id= req.body.user_id;
    const contactname= req.body.contactName;
    console.log("can you seee the message---",user_message); 
    console.log("id of current user --- ", user_id); 
    const Username = await Login_page.findOne({ where: { id: user_id } });
    const userMessage = await StoreMessage_page.create({
        message: user_message,
        ContactUsername: Username.name,
        CurrentUsername:contactname,
        SignupDbId: user_id
      });
    
    
    const Messagetime = await StoreMessage_page.findAll();

    
    
    res.status(200).json(userMessage);
    }
    catch{
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};