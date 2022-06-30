const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let bookSchema = new Schema({
  title: {
    type: String
  },
  chapters: {
    type: []
  }
}, {
    collection: 'books'
  })

module.exports = mongoose.model('book', bookSchema)
