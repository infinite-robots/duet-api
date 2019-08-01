var express = require('express');
var app = express();
const { CardService } = require('./service/CardService.js');
const { UserService } = require('./service/UserService.js');

const cardService = new CardService();
const userService = new UserService();

app.get('/', function (req, res) {
  res.send('Hello World!');
});


app.get('/cards', function (req, res) {
  res.status(200).send(cardService.getStack());
});



app.get('/users', function (req, res) {
  res.send(userService.getUsers());
});



var port = process.env.PORT || 3000;

var server = app.listen(port, function () {
  console.log('Server running at http://127.0.0.1:' + port + '/');
});
