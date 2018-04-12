class UserDto {
  constructor(userModel) {
    this.id = userModel.id;
    this.email = userModel.email;
    this.firstName = userModel.firstName;
    this.lastName = userModel.lastName;
  }
}

module.exports = UserDto;
