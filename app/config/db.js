let mongoose = require('mongoose');
let config = require('./index');

let dbURL = process.env.MONGODB_URI || config.dbURL;

mongoose.connect(dbURL);

mongoose.connection.on('connected', () => console.log(`Mongoose default connection open to ${ dbURL }`));

mongoose.connection.on('error', err => console.log(`Mongoose default connection error: ${ err }`));

mongoose.connection.on('disconnected', () => console.log('Mongoose default connection disconnected'));

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});
