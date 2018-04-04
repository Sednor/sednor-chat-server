let createError = require('http-errors');
let express = require('express');
let cors = require('cors');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let db = require('./config/db'); // eslint-disable-line

let publicRoutes = require('./routes/publicRoutes');
let privateRoutes = require('./routes/privateRoutes');
let config = require('./config/index');
let app = express();

// view engine setup
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors({ origin: config.whitelist, exposedHeaders: [config.authHeader] }));

app.use(config.apiPrefix, publicRoutes);
app.use(config.apiPrefix, require('./middlewares/auth.js'));
app.use(config.apiPrefix, privateRoutes);


// catch 404 and forward to error handler
app.use((req, res, next) => next(createError(404)));

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
