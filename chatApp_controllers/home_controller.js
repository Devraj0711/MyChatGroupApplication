const Home_page = require('../models/signup_db');
const path = require('path');
const { Op } = require('sequelize');

const bcrypt= require('bcrypt');

const jwt= require('jsonwebtoken');

//sigup page
exports.getSignup = (req, res, next) => {
    Home_page.findAll()
    .then(rows => {
      res.sendFile(path.join(__dirname, '..', 'view', 'Home', 'signup.html'));
      console.log(rows);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Internal Server Error');
    });
};

  

exports.postAddDetails = (req, res, next) => {
    console.log("post command", req.body);

    const name = req.body.name;
    const Email = req.body.Email;
    const phone_number= req.body.phone_number;
    const Password = req.body.Password;

    // Check if the email already exists in the database
    Home_page.findOne({
        where: {
            [Op.or]: [
                { Email: Email },
                { name: name },
                { phone_number: phone_number }
            ]
        }
        })
        .then(existingUser => {
            if (existingUser) {
                // Email already exists, return 403 Forbidden status
                return res.status(403).json({ success:false, message: 'User already exists' });
            } else {
                const saltrounds= 10;
                bcrypt.hash(Password, saltrounds, async(err, hash) =>{
                    console.log(err)
                    await Home_page.create({
                        name: name,
                        Email: Email,
                        phone_number: phone_number,
                        Password: hash
                    })
                    return res.status(200).json({ success: true, message: 'Sign up successful' }); // Redirect to a success page or wherever appropriate
                })
                
        }
    })
        .catch(err => {
            console.log(err);
            // Handle the error appropriately, e.g., send an error response or render an error page
        });
};

