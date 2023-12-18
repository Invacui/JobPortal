const mongoose = require("mongoose");
const Users = require("../models/Users");
const jwt = require('jsonwebtoken');

const IsLoggedIn = (req, res, next) => {
    try {
        const jwttoken = req.headers.jwttoken; // Corrected typo in req.header.jwttoken
        console.log(jwttoken)
        if (!jwttoken) {
            throw new Error('No token provided');
        }

        const user = jwt.verify(jwttoken, "Samvirk");
        req.user = user; // Attach the decoded user to the request object
        next();
    } catch (err) {
        next(err.message); // Pass the error to the next middleware
    }
};

module.exports = IsLoggedIn;
