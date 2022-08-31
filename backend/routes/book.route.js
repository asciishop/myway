let bookSchema = require('../models/book')
let chapterSchema = require('../models/chapter')
let messageSchema = require('../models/message')
let commentSchema = require('../models/comment')


let fs = require("fs");

let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();
const {verifyUser} = require("../authenticate");

require("dotenv").config()


const URL_SERVER = process.env.URL_SERVER;

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


router.route('/like').post((req, res, next) => {

  const {idBook, idUser, userName, bookTitle} = req.body;
  let obj = {"idUser": idUser}
  bookSchema.findByIdAndUpdate(
      idBook,
      { $addToSet: { likes: obj }},
      (error, data) => {
        if (error) {
          return next(error)
          console.log(error)
        } else {

          let author = data.user._id;
          let message = {"idBook": idBook,"idUser": idUser, "message": "Al usuario"+ userName +" le gusta tu historia : "+ bookTitle, "read": false , "date" : new Date()}
          messageSchema.create(message, (error, data) => {
            if (error) {
              return next(error)
            } else {
              console.log("Inbox message created")
            }
          })

          res.json(data)
          console.log('Book updated successfully !')
        }
      },
  )
})

router.route('/unlike').post((req, res, next) => {

  const {idBook, idUser, userName, bookTitle} = req.body;

  let obj = {"idUser": idUser}

  bookSchema.findByIdAndUpdate(
      idBook,
      { $pull: { likes: obj }},
      (error, data) => {
        if (error) {
          return next(error)
          console.log(error)
        } else {

          res.json(data)
          console.log('Book updated successfully !')
        }
      },
  )
})

router.route('/add-book').post((req, res, next) => {
  const { title, content, file, user } = req.body;
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
    } else if (extension === "png" || extension === "jpg" || extension === "gif" || extension === "jpeg" ){
      type = "image"
    } else if (extension === "mp4"){
      type = "video"
    }

    chapter = [{'text': '', 'type': type, 'link':link, 'user' : user, 'date': new Date()}];
  } else {
    chapter = [{'text': content, 'type': 'text', 'link': '', 'user' : user, 'date': new Date()}];
  }
  let book_main = {
    user,
    dateCreation : new Date(),
    title,
    chapters: chapter,
    likes : [],
    like : false
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
  const { id, content, file, user } = req.body;
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
    } else if (extension === "png" || extension === "jpg" || extension === "gif" || extension === "jpeg"){
      type = "image"
    } else if (extension === "mp4"){
      type = "video"
    }

    chapter = {'text': '', 'type': type, 'link':link, 'user' : user, 'date': new Date() , 'idBook' : id, 'bookTitle': ''};
  } else {
    chapter = {'text': content, 'type': 'text', 'link': '', 'user' : user, 'date': new Date(), 'idBook' : id, 'bookTitle': ''};
  }


  bookSchema.findByIdAndUpdate(
      id,
      { $addToSet: { chapters: chapter }},
      (error, data) => {
        if (error) {
          return next(error)
          console.log(error)
        } else {

          /*let author = data.user._id;
          let socket = req.app.get('connections')[author]
          if(socket) {
            socket.emit('message', {data: "Han agregado un capítulo a tu historia"});
          }*/


          //Send to
          chapter.bookTitle = data.title
          chapterSchema.create(chapter, (error, data) => {
            if (error) {
              return next(error)
            } else {
              console.log("Chapter created")

            }
          })

          let author = data.user._id;
          let message = {"idBook": id,"idUser": author, "message": "Novedades en tu historia : "+ data.title, "read": false , "date" : new Date()}
          messageSchema.create(message, (error, data) => {
            if (error) {
              return next(error)
            } else {
              console.log("Inbox message created")
            }
          })

          res.json(data)
          console.log('Chapter updated successfully !')
        }
      },
  )

});

// READ messages by user
router.route('/inbox/:id').get((req, res) => {
  messageSchema.find({"idUser": req.params.id},(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  }).sort({$natural:-1})
})

// READ books
router.route('/').get((req, res) => {
  bookSchema.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  }).sort({$natural:-1})
})



// READ books by page
router.route('/page').post((req, res) => {

  const { pageNumber } = req.body;
  let limitSize = pageNumber === 1 ? 0 : (pageNumber -1) * 5

  console.log("limitSize")
  console.log(limitSize)

  bookSchema.find({},(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  }).sort({$natural:-1})
      .skip(parseInt(limitSize) || 0)
      .limit(5)
})

//Book List
router.post("/bookListAuth", (req, res) => {

  const { userId,pageNumber } = req.body;

  let limitSize = pageNumber === 1 ? 0 : (pageNumber -1) * 5

  console.log("limitSize")
  console.log(limitSize)

  bookSchema.find({},(error, data) => {
    if (error) {
      return next(error)
    } else {

      if (data.length > 0){
        data.forEach(function(book) {

          if (book.likes.length > 0) {
            let index = book.likes.find((lk) => lk.idUser === userId);

            if (index === undefined || index === -1) {
              book.like = false
            } else {
              book.like = true
            }
          }
        });
      }

      res.json(data)
    }
  }).sort({$natural:-1})
      .skip(parseInt(limitSize) || 0)
      .limit(5)

})

// READ books by search
router.route('/search').post((req, res) => {

  var txt = "/" + req.body.searchBar + "/i";


  //{text: {$regex : /life/i}
  chapterSchema.find({
        $or: [{
          "bookTitle": {
            $regex: new RegExp('.*' +req.body.searchBar + '*', 'i')
          }
        },{
          "text": {
            $regex: new RegExp('.*' +req.body.searchBar + '*', 'i')
          },

        },{
          "user.username": {
            $regex: new RegExp('.*' +req.body.searchBar + '*', 'i')
          },

        }

        ]
      }
      ,(error, data) => {
        if (error) {
          return next(error)
        } else {
          res.json(data)
        }
      }).sort({$natural:-1})
})

// READ books by user
router.route('/book-by-user/:id').get((req, res) => {
  bookSchema.find({"user._id": req.params.id},(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  }).sort({$natural:-1})
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

router.route('/add-comment').post((req, res, next) => {
  const { message, user } = req.body;
  let comment = [{'user': user, 'message': message, 'date':new Date()}];


  commentSchema.create(comment, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(data)
      res.json(data)
    }
  })


});


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
