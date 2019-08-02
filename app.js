const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

var WebSocketServer = require('websocket').server;

var http = require('http');
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
    cardService.swipe(req.body).then(compass => res.status(200).send(compass));
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


const port = process.env.PORT || 3000;

const server = app.listen(port, function () {
  console.log('Server running at http://127.0.0.1:' + port + '/');
});










"use strict";
// Optional. You will see this name in eg. 'ps' or 'top' command
process.title = 'node-chat';
// Port where we'll run the websocket server
var webSocketsServerPort = 1337;
// list of currently connected clients (users)
var clients = [ ];
/**
 * HTTP server
 */
var webSocketServer = http.createServer(function(request, response) {
    // Not important for us. We're writing WebSocket server,
    // not HTTP server
});
webSocketServer.listen(webSocketsServerPort, function() {
    console.log((new Date()) + " Server is listening on port "
        + webSocketsServerPort);
});
/**
 * WebSocket server
 */
var wsServer = new WebSocketServer({
    // WebSocket server is tied to a HTTP server. WebSocket
    httpServer: webSocketServer,
    origins: '*:*'

});
// This callback function is called every time someone
// tries to connect to the WebSocket server
wsServer.on('request', function(request) {
    console.log((new Date()) + ' Connection from origin '
        + request.origin + '.');
    // accept connection - you should check 'request.origin' to
    // make sure that client is connecting from your website
    // (http://en.wikipedia.org/wiki/Same_origin_policy)
    var connection = request.accept(null, request.origin);
    // we need to know client index to remove them on 'close' event
    var index = clients.push(connection) - 1;
    var userName = false;
    console.log((new Date()) + ' Connection accepted.');

    // user sent some message
    connection.on('message', function(message) {
        console.log(decode_utf8(message.utf8Data));
        let messageObject = JSON.parse(decode_utf8(message.utf8Data));
        console.log(messageObject.name);
        console.log(messageObject.matchId);
        console.log(messageObject.message);
        if (message.type === 'utf8') { // accept only text
            // first message sent by user is their name
            // get random color and send it back to the user
            for (var i=0; i < clients.length; i++) {
                clients[i].send(JSON.stringify(messageObject));
            }
            console.log((new Date()) + ' User is known as: ' + userName
                    + ' with type '+ message.type);
        }
    });
    // user disconnected
    connection.on('close', function(connection) {

    });
});


function decode_utf8(s) {
    return decodeURIComponent(escape(s));
}
