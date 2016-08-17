//NODE MODULE IMPORTS
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const LocalStrategy = require('passport-local').Strategy;
const env = require('dotenv').config();

//ROUTE AND MODEL IMPORTS
const User = require('./models/user.js');
const index = require('./routes/index.js');

//DECLARE SERVER APP
const app = express();

//MONGO CONNECTION
const MongoURI = 'mongodb://localhost:27017/dfstc'
const MongoDB = mongoose.connect(MongoURI).connection;

MongoDB.on('error', function(err) {
  console.log('MongoDB Connection Error:', err);
})

MongoDB.once('open', function() {
  console.log('MongoDB Connetion Open!');
})

//PASSPORT AND SESSION CONFIG
app.use(session({
  secret: process.env.SECRET,
  key: 'user',
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 24 * 60 * 60 * 1000, secure: false}
}));

passport.use('local', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
  },
  function(email, password, done) {
    User.findOne({email: email}, function(err, user) {
      if(err) {
        return done(err);
      }
      if(!user) {
        return done(null, false, {message: 'Incorrect email and password'})
      }
      user.passwordCheck(password, function(err, isMatch) {
        if(err) {
          return done(err)
        }
        if(isMatch) {
          return done(null, user);
        } else {
          return done(null, false, {message: 'Incorrect email and password'});
        }
      });
    });
  }
));

//passport serializing/deserializing users
passport.serializeUser(function(user, done) {
  done(null, user.id);
})

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    if(err) {
      return done(err);
    }
    //determine what info is passed in the request.user object - removed password
    let userInfo = {};
    userInfo.email = user.email;
    userInfo.id = user.id;
    done(null, userInfo);
  })
})

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//STATIC AND SERVER CONFIG
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//ROUTES
app.use('/', index);
app.post('/register', function(request, response) {
  console.log(request.body);
  let email = request.body.email;
  let password = request.body.password;
  let user = new User({
    email: email,
    password: password
  });
  user.save(function(err) {
    if(err) {
      console.log(err);
    }
    response.sendStatus(200);
  })
})
app.post('/login', passport.authenticate('local', {
    successRedirect: '/success',
    failureRedirect: '/failure',
    failureFlash: true
  })
);

app.get('/success', function(request, response) {
  console.log(request.user);
  response.sendStatus(200);
})

app.get('/failure', function(request, response) {
  console.log(request.flash());
  response.sendStatus(403);
})

const port = process.env.PORT || 3000;
const server = app.listen(port, function() {
  console.log('listening on port:', port);
})
