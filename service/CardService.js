const { CompassUtil } = require('./utils/CompassUtil.js');
const { UserService } = require('./UserService.js');
const { BandService } = require('./BandService.js');

const compassUtil = new CompassUtil();
const userService = new UserService();
const bandService = new BandService();

// le stack overflow
// https://stackoverflow.com/a/6274381/8361429
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

class CardService {
  constructor() {
    //
  }

  async swipe(cardSwipe) {
    console.log('swipe: ' + JSON.stringify(cardSwipe));
    if (cardSwipe.type === 'band') {
      await userService.updateMusicInterest(cardSwipe);
      return CompassUtil.generate(await userService.getMusicInterest(cardSwipe.userId), false);
    } else {
      await userService.updateUserInterest(cardSwipe);
      return { match: await userService.checkMatch(cardSwipe.userId, cardSwipe.cardId) };
    }
  }

  async getStack(id) {
    let newUser = false; 
    let interests = await userService.getMusicInterest(id);
    if(interests === null || interests.length === 0) {
      newUser = true;
    }
    const bands = shuffle(JSON.parse(JSON.stringify(await bandService.getUnseenBands(id))))
      .map(band => ({...band, type: 'band'}));

    let people = [];
    if(!newUser) {
      people = shuffle(JSON.parse(JSON.stringify(await userService.getUnseenUsers(id))))
        .map(person => ({...person, type: 'person'})).slice(0, 3);
        for (const person of people) {
          person.compass = CompassUtil.generate(await userService.getMusicInterest(person.id), true);
        }
    }

    let bandsLength = newUser ? 10 : 3;
    return shuffle([...bands.slice(0, bandsLength), ...people]);
  }
}

module.exports = { CardService, shuffle };