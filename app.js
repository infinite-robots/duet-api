const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

"use strict";
const { CardService } = require('./service/CardService.js');
const { UserService } = require('./service/UserService.js');
const { BandService } = require('./service/BandService.js');

const cardService = new CardService();
const userService = new UserService();
const bandService = new BandService();

app.get('/', function (req, res) {
  res.send('Hello World!');
});


app.route('/cards/:id')
  .get((req, res) => {
    cardService.getStack(req.params.id).then(cards => res.status(200).send(cards));
  });
app.route('/cards/swipe')
  .post(function (req, res) {
    cardService.swipe(req.body).then(compass => res.status(200).send(compass));
  });


app.route('/users/:id')
  .get((req, res) => {
    userService.getUser(req.params.id).then(user => res.send(user));
  });

app.route('/users/:id/matches')
  .get((req, res) => {
    userService.getMatches(req.params.id).then(user => res.send(user));
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



//chat

app.route('/chats')
    .post((req, res) => {
        userService.chat(req.body, res);
    });

app.route('/chats/:id')
    .get((req, res)=> {
        userService.getMyChats(req.params.id).then(value => {
            res.status(200).send(value);
        }).catch(reason => {
            res.status(500).send(reason);
        })
    });


app.route('/chats/:id/duet/:chatId')
    .get((req, res)=> {
        userService.getMyDuetChats(req.params.id, req.params.chatId).then(value => {
            res.status(200).send(value);
        }).catch(reason => {
            res.status(500).send(reason);
        })
    });

app.route('/chats-for-match/:id').get((req, res)=> {
    userService.getChatsForMatch(req.params.id).then(value => {
        res.status(200).send(value);
    }).catch(reason => {
        res.status(500).send(reason);
    })
});
app.route('/interest-and-chats/:id')
    .get((req, res) => {
        userService.interestCount(req.params.id).then(value => {
            userService.chatCount(req.params.id).then(chatVal => {
                let val = value[0];
                val.chatcount = chatVal[0].chatcount;
                res.status(200).send(val);
            }).catch(reason => {
                res.status(500).send(reason);
            });

        }).catch(reason => {
            res.status(500).send(reason);
        });
    });

const port = process.env.PORT || 3000;

const server = app.listen(port, function () {
  console.log('Server running at http://127.0.0.1:' + port + '/');
});




