const Band = require('../server/models').band;

class BandService {
  constructor() {
    //
  }
    
  async getBands() {
    return await Band.findAll();
  }
}

module.exports = { BandService };