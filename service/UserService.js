const { CompassUtil } = require('./utils/CompassUtil.js');
const User = require('../server/models').user;



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
      compass:CompassUtil.getDefaultCompass()
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

  addUser(req,res) {
    let userDto = {
      name: req.body.name,
      bio: req.body.bio,
      gender: req.body.gender,
      age: req.body.age,
      createdAt: new Date(),
      updatedAt : new Date()
    };
    console.error("Saving", userDto);
    return User
        .create(userDto)
        .then(user => res.status(201).send(user))
        .catch(error => res.status(400).send(error));
  }
}

module.exports = { UserService };
