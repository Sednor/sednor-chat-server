let UserDto = require('../dtos/UserDto');
let UserService = require('../services/UserService');

class UserController {
  static get prefix() {
    return '/user';
  }

  static index(req, res) {
    UserService.findAll()
      .then(response => res.status(200).json(response.map(user => new UserDto(user))))
      .catch(() => res.sendStatus(500));
  }
}

module.exports = UserController;
