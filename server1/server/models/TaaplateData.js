import mongoose from "mongoose";
const config = require('../config/config')

const TaaplateData = new mongoose.Schema({
    UserName: {
        type: String,
        required: true
    },
    UserLastName: {
        type: String,
        required: true
    },
    UserEmail: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('TaaplateData', TaaplateData);