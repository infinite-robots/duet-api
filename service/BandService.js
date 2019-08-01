class BandService {
  constructor() {
    //
  }
    
  getBands() {
    let bands = [];
    bands.push({
      id:'4321',
      name:'Glass Animals',
      song:'Gooey',
      links: {
        img:'http://google.com',
        audio:'http://google.com'
      },
      compass:null
    });
    return bands;
  }
}

module.exports = { BandService };