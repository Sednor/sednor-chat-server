module.exports = {
  whitelist: ['http://localhost:63342', 'http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'https://sednor-chat-web.herokuapp.com', 'http://chat.sednor.net'],
  JWT_SECRET: 'sednor',
  EMAIL_SECRET: 'sednor-mail',
  apiPrefix: '/api/v1',
  authHeader: 'authorization',
  tokenExpiry: '4h',
  emailTokenExpiry: '1h',
  dbURL: 'mongodb://heroku_gchkwqm0:f72bn2t5oq47qjpo52riued8iq@ds151951.mlab.com:51951/heroku_gchkwqm0',
  chatPrefix: '/chat',
  wsPrefix: '/ws/v1',
  saltRounds: 10,
  sendGridApiKey: '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',
  fromEmail: 'company@sednor.net',
  url: 'https://sednor-chat-server.herokuapp.com'
};
