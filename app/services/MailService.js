let mailClient = require('../config/email');
let config = require('../config/index');

class MailService {
  static sendMail({ to, subject, body }) {
    let message = {
      to,
      from: config.fromEmail,
      subject,
      html: body,
      text: body
    };

    mailClient.send(message);
  }

  static signUpEmail(to, token) {
    let email = {
      to,
      subject: 'Verify email',
      body: MailService.signUpEmailTemplate(token)
    };

    MailService.sendMail(email);
  }

  static signUpEmailTemplate(token) {
    return `Here's your link: ${config.url}${config.apiPrefix}/auth/verify/${token}`;
  }
}

module.exports = MailService;
