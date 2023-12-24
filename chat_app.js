const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');

const errorController = require('./chatApp_controllers/error');  // to handle unknown url's

const sequelize =require('./util/database');

const app = express();

// get config vars
require('dotenv').config();

app.use(cors({origin: "*",}));

app.use(express.json()); // Parse JSON-encoded bodies
app.use(express.urlencoded({ extended: true }));


// this is inclued for ejs template
app.set('view engine', 'ejs');
app.set('views', 'view');

//for body parser and public path
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))

const chatRoutes = require('./chatApp_routes/login_route');
const chatScreenRoute = require('./chatApp_routes/chatScreen_route');


app.use(chatRoutes);
app.use(chatScreenRoute);
app.use(errorController.get404);  

//to set association between signup and message table 
const Login_page = require('./models/signup_db');
const StoreMessage_page= require('./models/storeMessage');

StoreMessage_page.belongsTo(Login_page);
Login_page.hasMany(StoreMessage_page);

app.use((req, res) => {
    console.log('url', req.url);
    res.sendFile(path.join(__dirname, `views/${req.url}`))

})




//use of sequelize to carry on all the DB commands
sequelize.sync() // Use { force: true } only during development to drop existing tables
    .then(result => {
        console.log('Tables synchronized successfully.');
        app.listen(process.env.PORT || 3000);
    })
    .catch(err => {
        console.log('Error synchronizing tables:', err);
    });

// Enable Sequelize logging
sequelize
    .authenticate()
    .then(() => {
        console.log('Database connection established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

