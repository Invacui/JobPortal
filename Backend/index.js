const express = require('express');
const bodyparser = require('body-parser'); 
const ejs = require('ejs');
const mongoose = require('mongoose');
const env = require('dotenv');
const { urlencoded } = require('body-parser');
const { Mongoose } = require('mongoose');

//Defining Packages======================>

const App = express(); //App Declaration
App.use(bodyparser, urlencoded({extended:false}));//bodyparser
App.set('view-engine', 'ejs'); //ejs
env.config({path:'./private.env'}) //env

//Mongoose Data / ENV Data====>
let Users  = mongoose.model('UserData',{
    First_Name:String,
    Last_Name:String,
    User_Name:String,
    Email:String,
    Phone:Number,
    Password:String,
});
const PORT = process.env.PORT;
const MONGODB_API = process.env.MONGOCONNECT;

//Route Definitions========================>

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
    try {
        await Users.find({})
        console.log(`Fetched User's Data Successfully!`)
    } catch (error) {
        console.log(`Something went wrong in Data Fetching, Error Message: ${error} `)
    }

    console.log("SERVER IS UP AND RUNNING!")
})

