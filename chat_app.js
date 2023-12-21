const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');

const errorController = require('./chatApp_controllers/error');

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

const chatRoutes = require('./chatApp_routes/home_route');


app.use(chatRoutes);
app.use(errorController.get404);  

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

