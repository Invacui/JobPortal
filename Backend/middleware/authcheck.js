const jwt = require('jsonwebtoken');
const Users = require('../models/Users')
const IsLoggedIn = async (req, res, next) => {
    try {
        console.log("User found++++++++++++++++:.")
        const jwttoken = req.headers.jwttoken; // Corrected typo in req.header.jwttoken
        console.log(jwttoken)
        if (!jwttoken) {
            res.status(401).json({
                message:"No_token provided"
            })
            throw new Error('No token provided');
        }

        const decoded = jwt.verify(jwttoken, "Samvirk");
               
        const user = await Users.findById(decoded._id);  // Fetch user details from the database based on the decoded token
        console.log("User found@@@@@@@====>>>>>:.", user);
        req.user = user; // Attach the decoded user to the request object This line attaches the user object obtained from the database to the req (request) object.
        next();
    } catch (err) {
        console.error("IsLoggedIn error:", err);
        res.status(401).json({
            message: "Authentication failed"
        });    }
};

module.exports = IsLoggedIn;
