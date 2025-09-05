const mongoose = require('mongoose')
const config = require('../config/config')

const generateDefaultArray = (size) => Array(size).fill(false)

const userSchema = new mongoose.Schema({
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
    },
    generateID: {
        type: Number,
        default: () => Math.floor(Math.random() * 10000)
    },
    idTab: {
        type: Number,
        required: true
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
        default: () => Array(config.STAND_CONFIG.resultTest).fill(0)
    }
    })

module.exports = mongoose.model('User', userSchema);