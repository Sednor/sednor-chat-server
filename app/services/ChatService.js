let Chat = require('../models/Chat');
let ChatDto = require('../dtos/ChatDto');

class ChatService {
  static findById(id) {
    return new Promise((resolve, reject) => Chat.findOne({ _id: id }, (err, chat) => {
      if (err) {
        return reject(err);
      }
      return resolve(new ChatDto(chat));
    }));
  }

  static create(users) {
    const CHAT = new Chat({ users });

    return new Promise((resolve, reject) => CHAT.save((err, chat) => {
      if (err) {
        return reject(err);
      }
      return resolve(new ChatDto(chat));
    }));
  }
}

module.exports = ChatService;
