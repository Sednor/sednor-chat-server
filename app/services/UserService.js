let User = require('../models/User');
let UserDto = require('../dtos/UserDto');

class UserService {
  static getAll() {
    return new Promise((resolve, reject) => User.find({}, (err, users) => {
      if (err) {
        return reject(err);
      }
      return resolve(users.map(user => new UserDto(user)));
    }));
  }
}

module.exports = UserService;
