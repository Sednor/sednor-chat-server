let ChatDto = require('../dtos/ChatDto');
let ChatService = require('../services/ChatService');

class ChatController {
  static get prefix() {
    return '/chat';
  }

  static findById(req, res) {
    ChatService.findById(req.params.id)
      .then(chat => res.status(200).json(new ChatDto(chat)))
      .catch(() => res.sendStatus(500));
  }

  static create(req, res) {
    ChatService.create(req.body.users)
      .then(chat => res.status(200).json(new ChatDto(chat)))
      .catch(() => res.sendStatus(500));
  }
}

module.exports = ChatController;
