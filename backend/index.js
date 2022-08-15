let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
const createError = require('http-errors');
const cookieParser = require("cookie-parser")
const passport = require("passport")
let session = require('express-session')
const FacebookStrategy = require('passport-facebook').Strategy;

require("dotenv").config()

// Express Route
require("./util/JwtStrategy")
require("./util/LocalStrategy")
require("./authenticate")

// Express Route
const userRoute = require("../backend/routes/userRoutes")
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
    cert: fs.readFileSync('./cert.crt'),
    key: fs.readFileSync('./cert.key')
}*/

app.use(express.static('public'));
app.use('/images', express.static('images'));
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cookieParser(process.env.COOKIE_SECRET))


const corsOptions = {
    origin: function (origin, callback) {
        callback(null, true);

    },

    credentials: true,
};

app.use(cors(corsOptions));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(session({ secret: process.env.SESSION_SECRET })); // session secret

app.use(passport.initialize())

passport.use(new FacebookStrategy({
        clientID: "2924868007817583",
        clientSecret: "9efc334a53a7916a97826ab86edbd5b2",
        callbackURL: "https://myways.cl:4000/users/auth/facebook/callback"
    }, function (accessToken, refreshToken, profile, done) {
    console.log("El perfil")
    console.log(JSON.stringify(profile))
    let user = {"firstName":"Andrés Vásquez","lastName":"","authStrategy":"facebook"}
    return done(null, user);
    }
));
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});


app.use("/users", userRoute)
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
