let jwt = require('jsonwebtoken');
let config = require('../config/index');
let errors = require('../config/errors');

let User = require('../models/User');

class AuthController {
  static get prefix() {
    return '/auth';
  }

  static signIn(req, res) {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err || !user) {
        res.status(401).json({
          error: {
            message: errors.invalidCredentials
          }
        });
        return;
      }

      if (req.body.password === user.password) {
        res.set(config.authHeader, jwt.sign(user.toJSON(), config.JWT_SECRET, { expiresIn: config.tokenExpiry }));
        res.sendStatus(200);
      } else {
        res.status(401).json({
          error: {
            message: errors.invalidCredentials
          }
        });
      }
    });
  }

  static signUp(req, res) {
    const USER = new User({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password
    });

    USER.save((err, user) => err ? res.status(500).json() : res.status(200).json(user));
  }

  static current(req, res) {
    res.json(req.user);
  }
}

module.exports = AuthController;
