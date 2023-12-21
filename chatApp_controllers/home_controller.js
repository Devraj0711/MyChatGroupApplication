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

  

exports.postAddSignupDetails = (req, res, next) => {
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
                return res.status(403).json({ success:false, message: 'User already exists.' });
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



exports.getSignin = (req, res, next) => {
    Home_page.findAll()
    .then(rows => {
      res.sendFile(path.join(__dirname, '..', 'view', 'Home', 'signin.html'));
      console.log(rows);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Internal Server Error');
    });
};


const generateAccessToken = (id, ispremiumuser) => {
    return jwt.sign({ ExpenseReportId: id, ispremiumuser }, 'dvysis23');
};

// function generateAccessToken(id, ispremiumuser)
// {
//     console.log("iddddd", id)
//     return jwt.sign({ExpenseReportId: id, ispremiumuser},'dvysis23')

// }

exports.PostSignin = (req, res, next) => {
    const {name, Password }= req.body
    console.log(req.body);

    console.log(name);
    // Check if the username exists in the database
    Home_page.findAll({
        where: {
            name: name
        }
    })
    .then(user => {
        if(user.length>0)
        {
        bcrypt.compare(Password, user[0].Password, (err, result)=>
        {
            if(err)
            {
                throw new Error('Something went wrong');
            }
            if(result=== true)
            {
                ans=generateAccessToken(user[0].id);
                console.log(generateAccessToken(user[0].id));
                return res.status(200).json({ success: true, message: 'Login successful', token: generateAccessToken(user[0].id, user[0].ispremiumuser) });
            }
            else
            {
                return res.status(400).json({ success: false, message: 'Invalid username or password' });
            }
        })
        }
        else
        {
            return res.status(404).json({ success: false, message: 'User doesnot exist' });
        }
    })
    .catch(err => {
        console.log(err);
        // Handle the error appropriately, e.g., send an error response or render an error page
        res.status(500).json({success: false, message: 'Internal Server Error' });
    });
};

exports.getAns = () => {
    return Home_page.ispremiumuser; // Export a function that returns the ans variable
};

exports.getPassword = (req, res, next) => {
    Home_page.findAll()
    .then(rows => {
      res.sendFile(path.join(__dirname, '..', 'views', 'password', 'forgetPassword.html'));
      console.log(rows);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Internal Server Error');
    });
};

exports.generateAccessToken = generateAccessToken;
