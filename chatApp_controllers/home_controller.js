const Home_page = require('../models/signup_db');
const path = require('path');
const { Op } = require('sequelize');

const bcrypt= require('bcrypt');

const jwt= require('jsonwebtoken');

//sigup page
exports.getSignup = (req, res, next) => {
    Home_page.findAll()
    .then(rows => {
      res.sendFile(path.join(__dirname, '..', 'views', 'Home', 'signup.html'));
      console.log(rows);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Internal Server Error');
    });
};

  

exports.postAddDetails = (req, res, next) => {
    console.log("post command", req.body);

    const Username = req.body.Username;
    const Email = req.body.Email;
    const Password = req.body.Password;

    // Check if the email already exists in the database
    Home_page.findOne({
        where: {
            [Op.or]: [
                { Email: Email },
                { Username: Username }
            ]
        }
        })
        .then(existingUser => {
            if (existingUser) {
                // Email already exists, return 403 Forbidden status
                return res.status(403).json({ success:false, message: 'Details already exists' });
            } else {
                const saltrounds= 10;
                bcrypt.hash(Password, saltrounds, async(err, hash) =>{
                    console.log(err)
                    await Home_page.create({
                        Username: Username,
                        Email: Email,
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

