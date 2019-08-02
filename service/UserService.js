const { CompassUtil } = require('./utils/CompassUtil.js');
const User = require('../server/models').user;
const MusicInterest = require('../server/models').music_interest;
const PeopleInterest = require('../server/models').people_interest;
const Chat = require('../server/models').Chat;
const db = require('../server/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const compassUtil = new CompassUtil();

const maxSampleId = 22;

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

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

  async addUser(user, res) {
    user.createdAt = new Date();
    user.updatedAt = new Date();
    console.log("Saving" + JSON.stringify(user));
    const muhUser = await User
        .create(user)
        .then(user => { res.status(201).send(user); return user; })
        .catch(error => res.status(400).send(error));
    for (const otherUser of shuffle(
        (await User.findAll())
          .map(user => user.id))
          .slice(0, 4)) {
      await PeopleInterest.create({
        user_id: otherUser,
        other_user_id: muhUser.id,
        matched: false,
        liked: true,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    return user;
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
    const match1 = await PeopleInterest.findAll({
      where: {
        user_id: userId,
        other_user_id: otherUserId
      }
    });
    const match2 = await PeopleInterest.findAll({
      where: {
        user_id: otherUserId,
        other_user_id: userId
      }
    });

    const openers = ['Hey, what are you listening to?','Heyy','Cool voice bio!','This is my first time on Duet! :)'];

    if (match1.length > 0 && match2.length > 0) {
      match1[0].matched = true;
      match2[0].matched = true;
      await match1[0].save();
      await match2[0].save();
      if (match2[0].user_id <= maxSampleId) {
        setTimeout(async () => {
          await Chat.create({
            userId: match2[0].user_id,
            chatterId: match1[0].user_id,
            message: openers[Math.floor(Math.random() * openers.length)],
            isRead: false,
            createdAt: new Date(),
            updatedAt: new Date()
          });
        }, Math.random() * 10000 + 3000);
      }
    }
  }

  async chat(chat, res){
    chat.createdAt = new Date();
    chat.updateAt = new Date();
    return await Chat.create(chat);

  }

  async establishChatRelationship(chat, res) {
    let temp = chat.userId;
    chat.userId = chat.chatterId;
    chat.chatterId = temp;
    chat.sender_id = 0;
    return await Chat.create(chat);
  }



  async getMyChats(id, res,) {
    console.log('Finding users chat by id:'+ id);
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
      }, order: [
        ['createdAt', 'ASC']
      ],
      attributes: ['userId', 'chatterId', 'message', 'isRead', 'createdAt', 'sender_id']
    });
  }

  /**
   *
   * @param id
   * @param chatId
   * @returns {Promise<*>}
   */
  async setViewed(id, chatId) {
    return await db.sequelize.query("UPDATE \"Chats\"  SET \"isRead\" = true WHERE \"userId\" = "+id +" AND " + "\"chatterId\"="+ chatId, { type: Sequelize.QueryTypes.UPDATE});
  }



  async setPeopleInterestViewed(id, chatId) {
    return await db.sequelize.query("UPDATE \"people_interests\"  SET \"viewed\" = true WHERE \"user_id\" = "+id, { type: Sequelize.QueryTypes.UPDATE});
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

  async reset() {
    await User.destroy({
      where: {
        id: { [Op.gt]: maxSampleId }
      }
    });
    await MusicInterest.truncate();
    await PeopleInterest.truncate();
    await Chat.truncate();
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
    return db.sequelize.query("SELECT COUNT(\"Chats\".\"userId\") as chatCount FROM \"Chats\" where \"Chats\".\"isRead\"=false AND \"Chats\".\"userId\" =" + id, { type: Sequelize.QueryTypes.SELECT});
  }
}

module.exports = { UserService };
