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
    await userService.updateMusicInterest(cardSwipe);
    return CompassUtil.generate(await userService.getMusicInterest(cardSwipe.userId));
  }

  async getStack(id) {
    const bands = shuffle(JSON.parse(JSON.stringify(await bandService.getUnseenBands(id))))
      .map(band => ({...band, type: 'band'}));

    const people = shuffle(JSON.parse(JSON.stringify(await userService.getUnseenUsers(id))))
      .map(person => ({...person, type: 'person'}));

    return shuffle([...bands.slice(0, 4), ...people.slice(0, 3)]);
  }
}

module.exports = { CardService };