module.exports = {
  whitelist: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'https://sednor-chat-web.herokuapp.com', 'http://chat.sednor.net'],
  JWT_SECRET: 'sednor',
  apiPrefix: '/api/v1',
  authHeader: 'authorization',
  tokenExpiry: '4h',
  dbURL: 'mongodb://heroku_gchkwqm0:f72bn2t5oq47qjpo52riued8iq@ds151951.mlab.com:51951/heroku_gchkwqm0'
};
