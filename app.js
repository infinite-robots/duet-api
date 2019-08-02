var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

const { CardService } = require('./service/CardService.js');
const { UserService } = require('./service/UserService.js');
const { BandService } = require('./service/BandService.js');

const cardService = new CardService();
const userService = new UserService();
const bandService = new BandService();

app.get('/', function (req, res) {
  res.send('Hello World!');
});


app.route('/cards')
  .get((req, res) => {
    cardService.getStack().then(cards => res.status(200).send(cards));
  })
app.route('/cards/swipe')
  .post(function (req, res) {
    cardService.swipe(req.body).then(cards => res.status(200).send(cards));
  });


app.route('/users/:id')
  .get((req, res) => {
    userService.getUser(req.params.id,).then(user => res.send(user));
  });

app.route('/users')
  .get((req, res)=> {
      userService.getUsers().then(users => res.send(users));
  }).post((req, res) => {
    userService.addUser(req.body, res);
  });

app.route('/bands')
  .get((req, res) => {
    res.send(bandService.getBands());
  });


var port = process.env.PORT || 3000;

var server = app.listen(port, function () {
  console.log('Server running at http://127.0.0.1:' + port + '/');
});
