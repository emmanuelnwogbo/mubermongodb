const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const app = express();

mongoose.Promise = global.Promise;

if(process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost:27017/muber');
}


app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

routes(app);

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message});
});

module.exports = app;
