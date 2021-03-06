let Chat = require('../models/Chat');
let ChatDto = require('../dtos/ChatDto');

class ChatService {
  static findAll(userId) {
    return new Promise((resolve, reject) => Chat.find({ users: userId })
      .populate('users')
      .exec((err, chats) => {
        if (err) {
          return reject(err);
        }
        return resolve(chats.map(chat => new ChatDto(chat)));
      }));
  }

  static findById(id) {
    return new Promise((resolve, reject) => Chat.findOne({ _id: id })
      .populate('users')
      .exec((err, chat) => {
        if (err) {
          return reject(err);
        }
        return resolve(new ChatDto(chat));
      }));
  }

  static create(userDtos) {
    const CHAT = new Chat({ name: userDtos.map(user => user.firstName).join(', '), users: userDtos.map(user => user.id) });

    return new Promise((resolve, reject) => CHAT.save(() => {
      CHAT.populate('users', (err, chat) => {
        if (err) {
          return reject(err);
        }
        return resolve(new ChatDto(chat));
      });
    }));
  }
}

module.exports = ChatService;
