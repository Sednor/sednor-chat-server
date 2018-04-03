class UserDto {
  constructor(userModel) {
    this._id = userModel._id;
    this.email = userModel.email;
    this.firstName = userModel.firstName;
    this.lastName = userModel.lastName;
  }
}

module.exports = UserDto;
