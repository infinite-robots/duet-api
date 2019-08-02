const { CompassUtil } = require('./utils/CompassUtil.js');
const User = require('../server/models').user;
const MusicInterest = require('../server/models').music_interest;
const PeopleInterest = require('../server/models').people_interest;
const Chat = require('../server/models').Chat;
const db = require('../server/models');
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

    //if(!(await MusicInterest.find({where: {}}))) TODO

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

   chat(chat, res){
    chat.createdAt = new Date();
    chat.updateAt = new Date();
    return Chat.create(chat)
        .then(chatResponse => {
          //flip it a reverse it
          let temp = chat.userId;
          chat.userId = chat.chatterId;
          chat.chatterId = temp;
          Chat.create(chat).then(value => res.send.status(201)).catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
  }


  async getMyChats(id, res) {
    console.log('Finding users chat by id:'+ id)
    return await Chat.findAll({
      where: {
        userId: id
      },order: [
        ['createdAt', 'ASC']
      ],
      attributes: ['userId', 'chatterId', 'message', 'isRead', 'createdAt']
    });

  }

  async getMyDuetChats(id, chatId){
    return await Chat.findAll({
      where: {
        userId: id,
        chatterId: chatId
      },order: [
        ['createdAt', 'ASC']
      ],
      attributes: ['userId', 'chatterId', 'message', 'isRead', 'createdAt']
    });
  }

  async getChatsForMatch(id) {
    return await Chat.findAll({
      where: {
        userId: id
      },order: [
        ['createdAt', 'ASC']
      ],
      group: ['chatterId'],
      attributes: ['userId', 'chatterId', 'message', 'isRead', 'createdAt']
    });
  }

  async getLastChats(id) {
    return await db.sequelize.query("SELECT * FROM \"Chats\" WHERE id = (SELECT MAX(id) FROM \"Chats\" where \"chatterId\" = " + id, { type: Sequelize.QueryTypes.SELECT});
  }

  async getMatches(id) {
    let matches = await db.sequelize.query(
      "SELECT * FROM public.people_interests where \"user_id\" = "+ id + " and matched = true", { type: Sequelize.QueryTypes.SELECT});
    let response = [];
    for(const match of matches) {
      let lastMessages = await db.sequelize.query("SELECT * FROM \"Chats\" WHERE id = (SELECT MAX(id) FROM \"Chats\" where \"chatterId\" = " + id + ")", { type: Sequelize.QueryTypes.SELECT});

      for (const lastMessage of lastMessages) {
        if(lastMessage.userId === match.other_user_id) {
          match.message = lastMessage.message;
          break;
        }
      }

      response.push({
        id: match.other_user_id,
        viewed: match.viewed,
        lastMessage: match.message
      });
    }

    matches = response;

    let people = await User.findAll();

    for (const match of matches) {
      for (const person of people) {
        if(person.id === match.id) {
          match.name = person.name;
          match.age = person.age;
          match.img = person.img;
          break;
        }
      }
    }

    return matches;
  }



  /**
   * Gets a count of unread people_interests for your id
   * @param id
   * @returns {*}
   */
  interestCount(id) {
    return db.sequelize.query("SELECT COUNT(user_id) as interestCount FROM people_interests where user_id = "+ id + " AND viewed= false", { type: Sequelize.QueryTypes.SELECT});
  }

  chatCount(id) {
    return db.sequelize.query("SELECT COUNT(\"Chats\".\"userId\") as chatCount FROM \"Chats\" where \"Chats\".\"userId\" =" + id, { type: Sequelize.QueryTypes.SELECT});
  }
}

module.exports = { UserService };
