const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const mongoose = require('mongoose');

const index = require('./routes/index.js');
const register = require('./routes/register.js');

const app = express();

app.use(express.static('public'));

app.use('/', index);
app.use('/register', register);

const port = process.env.PORT || 3000;
const server = app.listen(port, function() {
  console.log('listening on port:', port);
})
