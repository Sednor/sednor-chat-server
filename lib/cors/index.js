let cors = require('cors');

module.exports = function corsMiddleware(whitelist) {
    return cors({
        origin: (origin, callback) => {
            if (whitelist.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        }
    });
};


