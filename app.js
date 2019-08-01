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


app.get('/cards', function (req, res) {
  res.status(200).send(cardService.getStack());
});


app.route('/users/:id')
  .get((req, res)=> {
    res.send(userService.getUser(req.params.id));
  });

app.route('/users')
    .get((req, res)=> {
        res.send(userService.getUsers());
    });

app.route('/user')
    .post((req, res) => {
        userService.addUser(req, res);
  });

app.route('/band')
  .get((req, res) => {
    res.send(bandService.getBands());
  });


var port = process.env.PORT || 3000;

var server = app.listen(port, function () {
  console.log('Server running at http://127.0.0.1:' + port + '/');
});
