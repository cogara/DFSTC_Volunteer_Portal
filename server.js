//Node Module Imports
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const env = require('dotenv').config();

//route and models imports
const index = require('./routes/index.js');
const appointment = require('./routes/appointmentRoute');


//declare server app
const app = express();

//mongo connection
const MongoURI = 'mongodb://localhost:27017/dfstc'
const MongoDB = mongoose.connect(MongoURI).connection;

MongoDB.on('error', function(err) {
  console.log('MongoDB Connection Error:', err);
})

MongoDB.once('open', function() {
  console.log('MongoDB Connetion Open!');
})

//passport and session config
app.use(session({
  secret: process.env.SECRET,
  key: 'user',
  cookie: {maxAge: 24 * 60 * 60 * 1000, secure: false}
}));
passport.use('local', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
  },
  function(email, password, done) {
    User.findByEmail(email, function(err, user) {
      if(err) {
        return done(err);
      }
      if(!user) {
        return done(null, false, {message: 'Incorrect email and password'})
      }
      User.passwordCheck(user.email, password, function(err, isMatch) {
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

app.use(passport.initialize());
app.use(passport.session());

//static and server config
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());




app.use('/', index);
app.use('/api/appointment', appointment);

const port = process.env.PORT || 3000;
const server = app.listen(port, function() {
  console.log('listening on port:', port);
})
