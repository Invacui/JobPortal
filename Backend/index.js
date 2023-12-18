const express = require('express');
const bodyparser = require('body-parser'); 
const mongoose = require('mongoose');
const env = require('dotenv');
const cors = require('cors')
const dataservices = require('./dataservices/dataservices');
const  authroutes  = require('./routes/auth');
const dash = require('./routes/dashboard')

//Defining Packages======================>

const App = express(); //App Declaration
App.set('view engine', 'ejs'); //ejs
env.config({path:'./private.env'}) //env



//USE====>
App.use(cors());
App.use(bodyparser.urlencoded({extended:false}));  //bodyparser
App.use(express.json());
App.use('/auth' , authroutes);
App.use('/username' , dash)

//ENV Data====>

const PORT = process.env.PORT; 
const MONGODB_API = process.env.MONGOCONNECT;

//Route Definitions========================>
App.get('/' , (req,res) =>{
    res.json({
        Message:'Server is running !!'
    })
})
//Health Handler------->>
App.get('/health' , (req,res) =>{
    res.json({
        Message:'Server is running !!'
    })
})

//SignUp Handler
App.get('/Signup' , (req,res) =>{
//res.render('test');    
})

//Default Routes==========================>
App.listen(PORT,'0.0.0.0' ,async (req,res) =>{

    //Mongoose Connections==>
    mongoose.connect(MONGODB_API,{
        dbName : 'JobPortal'
    }).then(() =>{ console.log("DB_CONNECTION_SUCCESSFULL!")})
    .catch((error)=>{
        console.log(`Something went wrong, Error Message: ${error} `)
    })

    //Load Existing Data from DB
    await dataservices.fetchEData();

    console.log("SERVER IS UP AND RUNNING!")
})

