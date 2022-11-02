const mongoose = require('mongoose')
const { Schema } = mongoose

const boardSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: [5, 'must has more 5 character'],
        maxlength: 65,
    },
    columnOrder: {
        type: [String],
        default: []
    },
    _destroy: {
        type: Boolean,
        default: false
    },
    columns: [{ type: Schema.Types.ObjectId, ref: 'columns' }]
}, {
    timestamps: true,
    collection: 'boards',
    validateBeforeSave: true,
});


module.exports = mongoose.model('boards', boardSchema);