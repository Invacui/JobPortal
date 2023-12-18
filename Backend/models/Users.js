const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
    First_Name: {
        type: String,
        required: true,
    },
    Last_Name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    Phone: {
        type: Number,
        required: true,
        unique: true,
    },
    Password: {
        type: String,
        required: true,
    },
    IsPremium: {
        type: Boolean,
        required: true,
    },
});

module.exports = mongoose.model("UserData", UsersSchema);
