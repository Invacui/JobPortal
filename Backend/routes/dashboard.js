const express = require('express');
const mongoose = require('Mongoose');
const Users = require('../models/Users');
const IsLoggedIn = require("../middleware/authcheck");

const dash = express.Router();
//Dashboard====>
dash.get('/dashboard',IsLoggedIn, (req,res) =>{
    res.json({
        message:"Welcome to the dashboard user"
    })
})


module.exports = dash