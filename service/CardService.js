

class CardService {
  constructor() {
    //
  }
    
  getStack() {
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
    return cards;
  }
}

module.exports = { CardService };