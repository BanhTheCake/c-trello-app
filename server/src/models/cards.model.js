const mongoose = require('mongoose')
const { Schema } = mongoose
const ObjectId = Schema.ObjectId;

const cardSchema = new Schema({
    boardId: {
        type: ObjectId,
        required: true
    },
    columnId: {
        type: ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 65,
    },
    cover: {
        type: String,
        default: null
    },
    _destroy: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    collection: 'cards',
    validateBeforeSave: true,
});

module.exports = mongoose.model('cards', cardSchema);