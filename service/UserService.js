const { CompassUtil } = require('./utils/CompassUtil.js');
const User = require('../server/models').user;



const compassUtil = new CompassUtil();

class UserService {
  constructor() {
    //
  }
    
  async getUsers() {
    return await User.findAll();
  }

  getUser(id) {
    return User.findByPk(id);
  }

  addUser(user, res) {
    user.createdAt = new Date();
    user.updatedAt = new Date();
    console.log("Saving" + JSON.stringify(user));
    return User
        .create(user)
        .then(user => res.status(201).send(user))
        .catch(error => res.status(400).send(error));
  }
}

module.exports = { UserService };
