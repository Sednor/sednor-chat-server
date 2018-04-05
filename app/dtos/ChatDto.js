let UserDto = require('../dtos/UserDto');

class ChatDto {
  constructor(chatModel) {
    this._id = chatModel._id;
    this.name = chatModel.name;
    this.users = chatModel.users.map(user => new UserDto(user));
    this.messages = chatModel.messages;
  }
}

module.exports = ChatDto;
