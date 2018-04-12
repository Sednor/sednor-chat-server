class UserDto {
  constructor(userModel) {
    this.id = userModel._id.toString();
    this.email = userModel.email;
    this.firstName = userModel.firstName;
    this.lastName = userModel.lastName;
  }
}

module.exports = UserDto;
