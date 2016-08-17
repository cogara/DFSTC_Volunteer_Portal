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

//static and config
app.use(session({
  secret: process.env.SECRET,
  key: 'user',
  cookie: {maxAge: 24 * 60 * 60 * 1000, secure: false}
}));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());



app.use('/', index);

const port = process.env.PORT || 3000;
const server = app.listen(port, function() {
  console.log('listening on port:', port);
})
