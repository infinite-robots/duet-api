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
    });
    return users;
  }
}

module.exports = { UserService };