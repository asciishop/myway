const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let bookSchema = new Schema({
  user: {
    type: {}
  },
  dateCreation: {
    type: Date
  },
  title: {
    type: String
  },
  chapters: {
    type: []
  },
  likes: {
    type: []
  },
  like: {
    type: Boolean
  }
}, {
    collection: 'books'
  })

module.exports = mongoose.model('book', bookSchema)
