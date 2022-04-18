const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Book = mongoose.model('Book');

module.exports = app => {
  app.get('/api/book/:id', requireLogin, async (req, res) => {
    const book = await Book.findOne({
      _user: req.user.id,
      _id: req.params.id
    });

    res.send(book);
  });

  app.get('/api/books', requireLogin, async (req, res) => {
    const books = await Book.find({ _user: req.user.id });

    res.send(books);
  });

  app.post('/api/books', requireLogin, async (req, res) => {
    const { title, content } = req.body;

    const book = new Book({
      title,
      content,
      _user: req.user.id
    });

    try {
      await book.save();
      res.send(book);
    } catch (err) {
      res.send(400, err);
    }
  });
};
