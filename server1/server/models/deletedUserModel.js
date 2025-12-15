const mongoose = require('mongoose');

const deletedUserSchema = new mongoose.Schema({
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
    idTab: {
        type: String,
        required: true
    },
    deletedAt: {
        type: Date,
        default: Date.now,
        required: true
    }
}, {
    timestamps: false // Используем только deletedAt
});

// Индекс для быстрого поиска по дате удаления
deletedUserSchema.index({ deletedAt: -1 });

module.exports = mongoose.model('DeletedUser', deletedUserSchema);

