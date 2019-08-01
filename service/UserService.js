const { CompassUtil } = require('./utils/CompassUtil.js');

const compassUtil = new CompassUtil();

class UserService {
  constructor() {
    //
  }
    
  getUsers() {
    let users = [];
    users.push({
      id:'1234',
      name:'Jenn',
      age:34,
      bio:'Hello Duet',
      links: {
        img:'https://images.unsplash.com/photo-1446040945968-d303ecb10b4d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        audio: 'http://google.com'
      },
      compass:null
    });
    return users;
  }

  getUser(id) {
    let user;
    user = {
      id: id,
      name:'Jenn',
      age:34,
      bio:'Hello Duet',
      links: {
        img:'https://images.unsplash.com/photo-1446040945968-d303ecb10b4d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        audio: 'http://google.com'
      },
      compass: CompassUtil.getDefaultCompass()
    };
    return user;
  }

  addUser(user) {
    user.id = 12345;
    user.compass = CompassUtil.getDefaultCompass();
    console.log('Adding user: ' + user);
    return user;
  }
}

module.exports = { UserService };
