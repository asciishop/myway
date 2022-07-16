let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');

// Express Route
const bookRoute = require('../backend/routes/book.route')

// Connecting mongoDB Database
mongoose.connect(
    `mongodb+srv://admin:8iDs3adGQ3W0RaXk@cluster0.7geci.mongodb.net/myway?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
).then((x) => {
  console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
})
.catch((err) => {
      console.error('Error connecting to mongo', err)
})

const app = express();
const https = require('https');
var fs = require('fs');

/*
const httpsOptions = {
    key: fs.readFileSync('./security/cert.key'),
    cert: fs.readFileSync('./security/cert.pem')
}*/

app.use(express.static('public'));
app.use('/images', express.static('images'));
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/books', bookRoute)


// PORT
const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})
/*
var server = https.createServer(httpsOptions, app);
server.listen(port, () => {
    console.log("server starting on port : " + port)
});*/

// 404 Error
app.use((req, res, next) => {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
