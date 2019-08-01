const { CompassUtil } = require('./utils/CompassUtil.js');

const compassUtil = new CompassUtil();

class CardService {
  constructor() {
    //
  }

  swipe(cardSwipe) {
    console.log('swipe: ' + JSON.stringify(cardSwipe));
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
        img:'https://images.unsplash.com/photo-1446040945968-d303ecb10b4d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        audio: 'http://google.com'
      },
      compass: CompassUtil.getDefaultCompass()
    });
    cards.push({
      type:'band',
      id:'4321',
      name:'Glass Animals',
      song:'Gooey',
      links: {
        img:'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwjknpvEk-LjAhUyU98KHX3mCq0QjRx6BAgBEAQ&url=http%3A%2F%2Fwww.drunkenwerewolf.com%2Freviews%2Fglass-animals-zaba%2F&psig=AOvVaw0RfY-HbdEFNkJRdW8HRUhp&ust=1564765391130076',
        audio:'http://google.com'
      },
      compass: CompassUtil.getDefaultCompass()
    });
    return cards;
  }
}

module.exports = { CardService };