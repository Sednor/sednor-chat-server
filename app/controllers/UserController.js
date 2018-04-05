let UserService = require('../services/UserService');

class UserController {
  static get prefix() {
    return '/user';
  }

  static index(req, res) {
    UserService.findAll()
      .then(users => res.status(200).json(users))
      .catch(() => res.sendStatus(500));
  }
}

module.exports = UserController;
