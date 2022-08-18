const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let chapterSchema = new Schema({
  user: {
    type: {}
  },
  date: {
    type: Date
  },
  text: {
    type: String
  },
  type: {
    type: String
  },
    idBook: {
  type: String
},
  bookTitle: {
    type: String
  }
,
  link: {
    type: String
  }
}, {
    collection: 'chapters'
  })

module.exports = mongoose.model('chapter', chapterSchema)
