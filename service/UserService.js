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
        img:'http://google.com',
        audio: 'http://google.com'
      },
      compass:null
    });
    return users;
  }

  getUser(id) {
    let user;
    user = {
      id:'1234',
      name:'Jenn',
      age:34,
      bio:'Hello Duet',
      links: {
        img:'http://google.com',
        audio: 'http://google.com'
      },
      compass:null
    };
    return user;
  }

  addUser(user) {
    user.id = 12345;
    console.log('Adding user: ' + user);
    return user;
  }
}

module.exports = { UserService };