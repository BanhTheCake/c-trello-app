const mongoose = require('mongoose')
const { Schema } = mongoose
const ObjectId = Schema.ObjectId;

const columnSchema = new Schema({
    boardId: {
        type: ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 65,
    },
    cardOrder: {
        type: [String],
        default: []
    },
    _destroy: {
        type: Boolean,
        default: false
    },
    cards: [{ type: Schema.Types.ObjectId, ref: 'cards' }]
}, {
    timestamps: true,
    collection: 'columns',
    validateBeforeSave: true,
});

module.exports = mongoose.model('columns', columnSchema);