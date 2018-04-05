class ChatDto {
  constructor(chatModel) {
    this._id = chatModel._id;
    this.users = chatModel.users;
    this.messages = chatModel.messages;
  }
}

module.exports = ChatDto;
