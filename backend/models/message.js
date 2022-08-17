const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let messageSchema = new Schema({
  date: {
    type: Date
  },
  idUser: {
    type: String
  },
  message: {
    type: String
  },
  read: {
    type: Boolean
  }
}, {
  collection: 'messages'
})

module.exports = mongoose.model('message', messageSchema)
