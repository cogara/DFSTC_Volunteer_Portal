const express = require('express');
const app = express();
const index = require('./routes/index.js');


app.use(express.static('public'));

app.use('/', index);

const port = process.env.PORT || 3000;
const server = app.listen(port, function() {
  console.log('listening on port:', port);
})
