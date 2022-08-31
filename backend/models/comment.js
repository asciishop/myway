const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let commentSchema = new Schema({
    date: {
        type: Date
    },
    user: {
        type: String
    },
    message: {
        type: String
    }
}, {
    collection: 'comments'
})

module.exports = mongoose.model('comment', commentSchema)
