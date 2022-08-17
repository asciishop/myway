let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
const createError = require('http-errors');
const cookieParser = require("cookie-parser")
const passport = require("passport")
let session = require('express-session')
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oidc').Strategy;



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
const jwt = require("jsonwebtoken");


const httpsOptions = {
    cert: fs.readFileSync('./cert.crt'),
    key: fs.readFileSync('./cert.key')
}

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
        const { email, first_name, last_name } = profile._json;
        const userData = {
            email,
            firstName: first_name,
            lastName: last_name
        };
        //new userModel(userData).save();
        done(null, profile);
    }
));

passport.use(new GoogleStrategy({
        clientID: "997226468547-qrfhdurjq9kgcn1felabkmdunouusgno.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "https://myways.cl:4000/users/auth/google/callback"
    }, function (issuer, profile, done) {
        console.log(profile)
        const userData = {
            email : profile.emails[0].value ,
            firstName: profile.displayName,
            lastName: ''
        };
        //new userModel(userData).save();
        done(null, profile);
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

var connections = {};
app.set('connections', connections);

app.use("/users", userRoute)
app.use('/books', bookRoute)


// PORT
const port = process.env.PORT || 4000;

/*
const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})*/

var server = https.createServer(httpsOptions, app);
server.listen(port, () => {
    console.log("server starting on port : " + port)
});


const io = require("socket.io")(server, {cors: {origin: "*"}});

let interval;

io.on("connection", (socket) => {
    console.log("New client connected");
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(() => getApiAndEmit(socket), 1000);
    socket.on("disconnect", () => {
        console.log("Client disconnected");
        clearInterval(interval);
    });

    socket.on('authenticate', function(data){

        var user = jwt.decode(data.token, "the-secret");
        app.get('connections')[user._id] = socket;
        socket.auth = true;

    });

});

const getApiAndEmit = socket => {
    const response = new Date();
    // Emitting a new message. Will be consumed by the client
    socket.emit("FromAPI", response);
};

// 404 Error
app.use((req, res, next) => {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});
