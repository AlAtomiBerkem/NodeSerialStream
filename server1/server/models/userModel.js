const mongoose = require('mongoose')
const config = require('../config/config')

const generateDefaultArray = (size) => Array(size).fill(false)

const userSchema = new mongoose.Schema({
    UserName: {
        type: String,
        require: true
    },
    UserLastName: {
        type: String,
        require: true
    },
    UserEmail: {
        type: String,
        require: true
    },
    generateID: {
        type: Number,
        default: () => Math.floor(Math.random() * 10000)
    },
    idTab: {
        type: String,
        require: true
    },
    checkingRoomOne: {
        type: [Boolean],
        default: () => generateDefaultArray(config.STAND_CONFIG.checkingRoomOne)
    },
    checkingRoomTwo: {
        type: [Boolean],
        default: () => generateDefaultArray(config.STAND_CONFIG.checkingRoomTwo)
    },
    checkingRoomThree: {
        type: [Boolean],
        default: () => generateDefaultArray(config.STAND_CONFIG.checkingRoomThree)
    },
    checkingTestStand: {
        type: [Boolean],
        default: () => generateDefaultArray(config.STAND_CONFIG.checkingRoomThree)
    },
    resultTest: {
        type: [Number],
        default: () => generateDefaultArray(config.STAND_CONFIG.resultTest)
    }
    })

module.exports = mongoose.model('User', userSchema);