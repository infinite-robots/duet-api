const { CompassUtil } = require('./utils/CompassUtil.js');
const { UserService } = require('./UserService.js');
const { BandService } = require('./BandService.js');

const compassUtil = new CompassUtil();
const userService = new UserService();
const bandService = new BandService();

class CardService {
  constructor() {
    //
  }

  async swipe(cardSwipe) {
    console.log('swipe: ' + JSON.stringify(cardSwipe));
    return CompassUtil.generate(await userService.getMusicInterest(cardSwipe.userId));
  }
    
  async getStack() {
    let bands = await bandService.getBands();
    let people = JSON.parse(JSON.stringify(await userService.getUsers()));

    people.forEach(person => {
      person.type = 'person';
    });

    bands.forEach(band => {
      band.type = 'band';
    });

    let cards = [
      ...bands,
      ...people
    ];



    return cards;
  }
}

module.exports = { CardService };