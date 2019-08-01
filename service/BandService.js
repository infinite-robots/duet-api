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
        img:'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwjknpvEk-LjAhUyU98KHX3mCq0QjRx6BAgBEAQ&url=http%3A%2F%2Fwww.drunkenwerewolf.com%2Freviews%2Fglass-animals-zaba%2F&psig=AOvVaw0RfY-HbdEFNkJRdW8HRUhp&ust=1564765391130076',
        audio:'http://google.com'
      },
      compass:null
    });
    return bands;
  }
}

module.exports = { BandService };