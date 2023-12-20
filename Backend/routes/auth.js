const express = require('express');
const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const jwttoken = require('jsonwebtoken');

const router = express.Router();
//Async Functions for L/S Page
async function checkcondtions( email, phone, password, cpass) {
    console.log(`"conditions check hit" ${email},${phone},${password},${cpass}`);
    try {
        const confirmD = await Users.findOne({
            $or: [{ Email: email }, { Phone: phone }],
        });

        if (confirmD) {
            throw new Error('User Already Exist!');
        } else if (password !== cpass) {
            throw new Error('Passwords do not match');
        }
         else if (password.length <= 4) {
            throw new Error('Passwords Length should be min 4 Digits');
        } else {
            return true;
        }
    } catch (error) {
        console.error(`Error checking conditions: ${error.message}`);
        throw new Error(error.message); // Throw the dynamic error message
    }
}

async function loginvalidator(email , password) {
    try {
        const mailcheck = await Users.findOne({Email:email});
        console.log(mailcheck)
        if(mailcheck){
            const passcheck = await bcrypt.compare(password,mailcheck.Password);
            if(passcheck){
                return mailcheck;
            }
            else{
                throw new Error("Password is Incorrect Please Check Again!")
            }
        }
        else{
            throw new Error("Email is Incorrect Please Check Again!")
        }
    } catch (error) {
        throw new Error(error.message)
    }
}

//Handlers
router.post('/signup', async (req, res) => {
    console.log(req.body);
    const { fname, lname, email, phone, password, cpass , usertype} = req.body;
    //Bcrypt
    const hashed_password = await bcrypt.hash(password , 10);
    try {
        const conditionsres = await checkcondtions( email, phone, password, cpass);
        if (conditionsres) {
            const firstuser = await Users.create({ First_Name: fname, Last_Name: lname,  Email: email, Phone: phone, Password: hashed_password, IsPremium: false , IsRecruiter : usertype});
            const jwttokengen = jwttoken.sign(firstuser.toJSON() , "Samvirk" , {expiresIn:120})
            res.status(200).json({
                Message: 'User created successfully',
                jwttokengen
            });
        } else {
            res.status(400).json({
                Message: 'Conditions not met. User not created.'
            });
        }
    } catch (error) {
        res.status(400).json({
            Message: `Error creating user: ${error.message}`
        });
    }
});

router.post('/login' , async (req,res) =>{
    try{
        const {email , password} = req.body;
        console.log(email)
        const loguser = await loginvalidator(email,password);
        const jwttokengen = jwttoken.sign(loguser.toJSON() , "Samvirk" , {expiresIn:1200})
        res.status(200).json({
            message:'Login Successfull',
            jwttokengen
        })
    }catch(error){
        res.status(400).json({
            message:`Error! Cannot Login. Error Message: ${error.message}`
        })
    }
})

module.exports = router 