let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');

let config = require('../config/index');
let errors = require('../config/errors');
let messages = require('../config/messages');

let User = require('../models/User');
let UserDto = require('../dtos/UserDto');
let MailService = require('./MailService');

class AuthService {
  static signIn(email, password) {
    return new Promise((resolve, reject) => User.findOne({ email }, (err, user) => {
      if (err || !user) {
        return reject(err);
      }
      if (!user.verified) {
        return reject(errors.notVerified);
      }

      bcrypt.compare(password, user.password, (error, result) => {
        if (result) {
          return resolve(new UserDto(user));
        } else {
          return reject(error);
        }
      });
    }));
  }

  static signUp(user) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(user.password, config.saltRounds, (error, hash) => {
        const USER = new User({
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          password: hash
        });

        USER.save((err, userModel) => {
          if (err) {
            return reject(err);
          }

          let userDto = new UserDto(userModel);
          let token = AuthService.createToken(userDto, config.EMAIL_SECRET, config.emailTokenExpiry);

          MailService.signUpEmail(userDto.email, token);

          return resolve();
        });
      });
    });
  }

  static createToken(data, secret = config.JWT_SECRET, expiry = config.tokenExpiry) {
    return jwt.sign({ data }, secret, { expiresIn: expiry });
  }

  static verifyEmail(token) {
    return new Promise((resolve, reject) => {
      let userDto;

      try {
        userDto = new UserDto(jwt.verify(token, config.EMAIL_SECRET).data);
      } catch (error) {
        return reject(error);
      }

      User.findOne({ email: userDto.email }, (err, user) => {
        if (err) {
          return reject(err);
        }
        if (user.verified) {
          return reject(messages.alreadyVerified);
        }

        user.verified = true;
        user.save();
        return resolve(new UserDto(user));
      });
    });
  }
}

module.exports = AuthService;
