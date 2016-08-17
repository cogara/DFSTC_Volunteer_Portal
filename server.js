const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const index = require('./routes/index.js');
const register = require('./routes/register.js');

const app = express();

mongoose.connect(config.database);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', index);
app.use('/register', register);

const port = process.env.PORT || 3000;
const server = app.listen(port, function() {
  console.log('listening on port:', port);
})
