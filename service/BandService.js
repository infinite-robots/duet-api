const Band = require('../server/models').band;
const MusicInterest = require('../server/models').music_interest;
const Sequelize = require('sequelize');

const Op = Sequelize.Op;

class BandService {
  constructor() {
    //
  }
    
  async getBands() {
    return await Band.findAll();
  }

  async getUnseenBands(id) {
    return await MusicInterest.findAll({
      where: {
        [Op.not]: { user_id: id }
      }
    });
  }

  async getUnseenBands(id) {
    const interests = (await MusicInterest.findAll({where: {user_id: id}})).map(band => band.band_id);
    const unseen = await Band.findAll().filter(band => !interests.includes(band.id));
    return unseen;
  }
}

module.exports = { BandService };