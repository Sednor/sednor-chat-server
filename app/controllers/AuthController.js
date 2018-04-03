let jwt = require('jsonwebtoken');
let config = require('../config/index');
let errors = require('../config/errors');
let bcrypt = require('bcryptjs');

let User = require('../models/User');
let UserDto = require('../dtos/UserDto');

let saltRounds = 10;

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

      bcrypt.compare(req.body.password, user.password, (error, result) => {
        if (result) {
          res.set(config.authHeader, jwt.sign({ data: new UserDto(user) }, config.JWT_SECRET, { expiresIn: config.tokenExpiry }));
          res.sendStatus(200);
        } else {
          res.status(401).json({
            error: {
              message: errors.invalidCredentials
            }
          });
        }
      });
    });
  }

  static signUp(req, res) {
    bcrypt.hash(req.body.password, saltRounds, (error, hash) => {
      const USER = new User({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hash
      });

      USER.save(err => err ? res.sendStatus(500) : res.sendStatus(200));
    });
  }

  static current(req, res) {
    res.json(new UserDto(req.user.data));
  }
}

module.exports = AuthController;
