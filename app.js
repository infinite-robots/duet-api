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
  res.send(cardService.getStack());
});



app.get('/users', function (req, res) {
  res.send(userService.getUsers());
});



app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
