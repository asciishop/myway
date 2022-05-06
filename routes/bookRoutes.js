const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');



const Book = mongoose.model('Books');

module.exports = app => {
  app.get('/api/book/:id', requireLogin, async (req, res) => {
    const book = await Book.findOne({
      _user: req.user.id,
      _id: req.params.id
    });

    res.send(book);
  });

  app.get('/api/book', requireLogin, async (req, res) => {
    const book = await Book.find({ _user: req.user.id });

    res.send(book);
  });

  app.get('/api/allbooks',async (req, res) => {
   try {
    const book = await Book.find({});
    res.send(book);
   } catch (error) {
    res.status(400).json({ message: error.message })
   }
     
  });


  app.post('/api/book', requireLogin, async (req, res) => {
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
