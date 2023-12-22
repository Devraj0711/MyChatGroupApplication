const Login_page = require('../models/signup_db');
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
        
       
        // Send both JSON data and HTML content as the response
        // res.sendFile(path.join(__dirname, '..', 'view', 'Message', 'chatScreen.html'));
        res.status(200).send(userList);

        // res.setHeader('Content-Type', 'application/json');
        // res.status(200).json(userList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }    
};

// exports.getChatScreen= (req, res, next) =>{
//     Login_page.findAll()
//     .then(rows => {
//         console.log("Hey", rows);
//       res.sendFile(path.join(__dirname, '..', 'view', 'Message', 'chatScreen.html'));
      
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).send('Internal Server Error');
//     });

// };