const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true // Good practice to remove whitespace
    },
    email: {
        type: String, // Corrected: The data type is a String
        required: true,
        unique: true,
        trim: true,
        lowercase: true // Good practice to store emails in a consistent format
    },
    password: {
        type: String,
        required: true,
        select: false // Recommended: Prevents password from being sent in queries
    },
}, {
    // Adds createdAt and updatedAt timestamps automatically
    timestamps: true
});

module.exports = mongoose.model('User', AuthSchema); // Renamed to 'User' for convention