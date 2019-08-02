const { CompassUtil } = require('./utils/CompassUtil.js');
const User = require('../server/models').user;
const MusicInterest = require('../server/models').music_interest;
const PeopleInterest = require('../server/models').people_interest;
const Sequelize = require('sequelize');

const Op = Sequelize.Op;

const compassUtil = new CompassUtil();

class UserService {
  constructor() {
    //
  }

  async updateMusicInterest(cardSwipe) {
    if(!cardSwipe.genre){
      return;
    }
    return await MusicInterest.create({
      user_id: cardSwipe.userId,
      band_id: cardSwipe.cardId,
      genre: cardSwipe.genre,
      liked: cardSwipe.swipe === 'right',
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  async updateUserInterest(cardSwipe) {
    return await PeopleInterest.create({
      user_id: cardSwipe.userId,
      other_user_id: cardSwipe.cardId,
      matched: false,
      liked: cardSwipe.swipe === 'right',
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }
    
  async getUsers() {
    return await User.findAll();
  }

  async getUnseenUsers(id) {
    const interests = (await this.getUserInterests(id)).map(user => user.other_user_id);
    const unseen = await User.findAll({
      where: {
        id: {
          [Op.ne]: Number(id)
        }
      }
    }).filter(user => !interests.includes(user.id));

    return unseen;
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

  async getMusicInterest(userId) {
    return MusicInterest.findAll({
      where: {
        user_id: userId
      }
    })
  }

  async getUserInterests(userId) {
    return await PeopleInterest.findAll({
      where: {
        user_id: userId
      }
    });
  }

  async checkMatch(userId, otherUserId) {
    return (await PeopleInterest.findAll({
      where: {
        user_id: userId,
        other_user_id: otherUserId
      }
    })).length > 0 && (await PeopleInterest.findAll({
      where: {
        user_id: otherUserId,
        other_user_id: userId
      }
    })).length > 0;
  }
}

module.exports = { UserService };
