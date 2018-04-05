let ChatService = require('../services/ChatService');
let UserDto = require('../dtos/UserDto');

class ChatController {
  static get prefix() {
    return '/chat';
  }

  static index(req, res) {
    ChatService.findAll(req.user.data._id)
      .then(chats => res.status(200).json(chats))
      .catch(() => res.sendStatus(500));
  }

  static findById(req, res) {
    ChatService.findById(req.params.id)
      .then(chat => res.status(200).json(chat))
      .catch(() => res.sendStatus(500));
  }

  static create(req, res) {
    let users = JSON.parse(req.body.users);
    let currentUser = new UserDto(req.user.data);

    if (!users.map(user => user._id).includes(currentUser._id)) {
      res.sendStatus(403);
      return;
    }

    ChatService.create(users.map(user => new UserDto(user)))
      .then(chat => res.status(200).json(chat))
      .catch(() => res.sendStatus(500));
  }
}

module.exports = ChatController;