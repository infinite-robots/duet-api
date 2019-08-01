var express = require('express');
var app = express();



app.get('/', function (req, res) {
  res.send('Hello World!');
});


app.get('/cards', function (req, res) {
  let cards = [];
  cards.push({
    type:'person',
    id:'1234',
    name:'Jenn',
    age:34,
    bio:'Hello Duet',
    links: {
      img:'http://google.com',
      audio: 'http://google.com'
    },
    compass:null
  });
  cards.push({
    type:'band',
    id:'4321',
    name:'Glass Animals',
    song:'Gooey',
    links: {
      img:'http://google.com',
      audio:'http://google.com'
    },
    compass:null
  });
  res.send(cards);
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
