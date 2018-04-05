class MessageDto {
  constructor(messageModel) {
    this._id = messageModel._id;
    this.author = messageModel.author;
    this.payload = messageModel.payload;
    this.createdAt = messageModel.createdAt;
  }
}

module.exports = MessageDto;
