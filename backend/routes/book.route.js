let bookSchema = require('../models/book')
let fs = require("fs");

let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();

//let fs = require('fs')

const URL_SERVER = "http://localhost:4000"

// book Model


// CREATE book
router.route('/create-book').post((req, res, next) => {
  bookSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(data)
      res.json(data)
    }
  })
})

router.route('/add-book').post((req, res, next) => {
  const { title, content, file } = req.body;
  let chapter = [{'text': '', 'type': '', 'link':''}];

  if(file) {
    let bufferImage =  decodeBase64Image(file);
    let mime = file.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0];
    let localPath = './public/images';
    let localServer = URL_SERVER+'/images'
    let fileName = "/book_TEST-USER_"+ (Math.floor(Math.random() * (1 - 1000)) + 1) +""+  mime.replace('image/','.').replace('audio/','.').replace('video/','.');
    let fileNameDisk = localPath+""+ fileName;
    let link = localServer+""+fileName;
    fs.writeFileSync(fileNameDisk, bufferImage);

    let type = ''
    let extension = mime.replace('image/','').replace('audio/','').replace('video/','')
    console.log("Extension")
    console.log(extension)
    if (extension === "mpeg" || extension === "mp3" || extension === "aac"){
      type = "audio"
    } else if (extension === "png" || extension === "jpg" || extension === "gif"){
      type = "image"
    } else if (extension === "mp4"){
      type = "video"
    }

    chapter = [{'text': '', 'type': type, 'link':link}];
  } else {
    chapter = [{'text': content, 'type': 'text', 'link': ''}];
  }
  let book_main = {
    title,
    chapters: chapter
  };

  bookSchema.create(book_main, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(data)
      res.json(data)
    }
  })


});

router.route('/add-chapter').post((req, res, next) => {
  const { id, content, file } = req.body;
  let chapter = [{'text': '', 'type': '', 'link':''}];

  if(file) {
    let bufferImage =  decodeBase64Image(file);
    let mime = file.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0];
    let localPath = './public/images';
    let localServer = URL_SERVER+'/images'
    let fileName = "/book_TEST-USER_"+ (Math.floor(Math.random() * (1 - 1000)) + 1) +""+  mime.replace('image/','.').replace('audio/','.').replace('video/','.');
    let fileNameDisk = localPath+""+ fileName;
    let link = localServer+""+fileName;
    fs.writeFileSync(fileNameDisk, bufferImage);

    let type = ''
    let extension = mime.replace('image/','').replace('audio/','').replace('video/','')

    if (extension === "mpeg" || extension === "mp3" || extension === "aac"){
      type = "audio"
    } else if (extension === "png" || extension === "jpg" || extension === "gif"){
      type = "image"
    } else if (extension === "mp4"){
      type = "video"
    }

    chapter = {'text': '', 'type': type, 'link':link};
  } else {
    chapter = {'text': content, 'type': 'text', 'link': ''};
  }


      bookSchema.findByIdAndUpdate(
          id,
          { $addToSet: { chapters: chapter }},
          (error, data) => {
            if (error) {
              return next(error)
              console.log(error)
            } else {
              res.json(data)
              console.log('Chapter updated successfully !')
            }
          },
      )

});

// READ books
router.route('/').get((req, res) => {
  bookSchema.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get Single book
router.route('/edit-book/:id').get((req, res) => {
  bookSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update book
router.route('/update-book/:id').put((req, res, next) => {
  bookSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error)
        console.log(error)
      } else {
        res.json(data)
        console.log('book updated successfully !')
      }
    },
  )
})

// Delete book
router.route('/delete-book/:id').delete((req, res, next) => {
  bookSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({
        msg: data,
      })
    }
  })
})


function decodeBase64Image(dataString) {
  var matches = dataString.match(/^data:([0-9A-Za-z-+\/]+);base64,(.+)$/),
      response = {};

  if (matches.length !== 3) {
    return new Error('Invalid input string');
  }

  response.type = matches[1];
  response.data = new Buffer(matches[2], 'base64');

  return response.data;
}
module.exports = router
