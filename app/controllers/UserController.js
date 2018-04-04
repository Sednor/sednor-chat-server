let User = require('../models/User');
let UserDto = require('../dtos/UserDto');

class UserController {
  static get prefix() {
    return '/user';
  }

  static index(req, res) {
    User.find({}, (err, users) => {
      if (err) {
        res.sendStatus(500);
        return;
      }
      res.status(200).json(users.map(user => new UserDto(user)));
    });
  }
}

module.exports = UserController;
