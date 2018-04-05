let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');

let config = require('../config/index');
let User = require('../models/User');
let UserDto = require('../dtos/UserDto');

let saltRounds = 10;

class AuthService {
  static signIn(email, password) {
    return new Promise((resolve, reject) => User.findOne({ email }, (err, user) => {
      if (err || !user) {
        return reject(err);
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
      bcrypt.hash(user.password, saltRounds, (error, hash) => {
        const USER = new User({
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          password: hash
        });

        USER.save(err => {
          if (err) {
            return reject(err);
          }
          return resolve();
        });
      });
    });
  }

  static createToken(userDto) {
    return jwt.sign({ data: userDto }, config.JWT_SECRET, { expiresIn: config.tokenExpiry });
  }
}

module.exports = AuthService;
