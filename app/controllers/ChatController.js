let ChatService = require('../services/ChatService');
let UserDto = require('../dtos/UserDto');

class ChatController {
  static get prefix() {
    return '/chat';
  }

  static index(req, res) {
    ChatService.findAll(req.user.data._id)
      .then(chatDtos => res.status(200).json(chatDtos))
      .catch(() => res.sendStatus(500));
  }

  static findById(req, res) {
    let currentUser = new UserDto(req.user.data);

    ChatService.findById(req.params.id)
      .then(chatDto => {
        if (!chatDto.users.map(user => user._id).includes(currentUser._id)) {
          res.sendStatus(403);
          return;
        }
        res.status(200).json(chatDto);
      })
      .catch(() => res.sendStatus(500));
  }

  static create(req, res) {
    let users = req.body.users;
    let currentUser = new UserDto(req.user.data);

    if (!users.map(user => user._id).includes(currentUser._id)) {
      res.sendStatus(403);
      return;
    }

    ChatService.create(users.map(user => new UserDto(user)))
      .then(chatDto => res.status(200).json(chatDto))
      .catch(() => res.sendStatus(500));
  }
}

module.exports = ChatController;
