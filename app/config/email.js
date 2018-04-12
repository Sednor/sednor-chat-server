let mailClient = require('@sendgrid/mail');

let config = require('./index');

mailClient.setApiKey(process.env.SENDGRID_API_KEY || config.sendGridApiKey);

module.exports = mailClient;
