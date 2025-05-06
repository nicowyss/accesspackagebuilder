require('dotenv').config();
require('dotenv').config({ path: './.env' });

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session'); 

const isProd = process.env.NODE_ENV === 'production';

// Import routers
var indexRouter = require('./routes/index');
var successRouter = require('./routes/success');
var authRouter = require('./routes/auth'); 
var overviewRouter = require("./routes/overview");
var builderRouter = require("./routes/builder");
var nextStepsRouter = require("./routes/nextSteps");
var deployRouter = require("./routes/deploy");
var builderManualRouter = require("./routes/buildermanual");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configure session middleware
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false, // Do not set cookies until something is stored in session
    cookie: {
      secure: isProd,                // Only send cookies over HTTPS in production
      httpOnly: true,                // Prevent client-side JS access
      sameSite: isProd ? 'None' : 'Lax', // safer default for local dev
      maxAge: 60 * 60 * 1000         // 1 hour session expiration
    }
  })
);


app.use((req, res, next) => {
  res.locals.insightsConnectionString = isProd ? process.env.APPLICATIONINSIGHTS_CONNECTION_STRING : null;
  next();
});

// Use routers
app.use('/', indexRouter);
app.use('/', successRouter);
app.use('/auth', authRouter);
app.use("/overview", overviewRouter);
app.use("/builder", builderRouter);
app.use("/nextSteps", nextStepsRouter);
app.use("/deploy", deployRouter);
app.use("/buildermanual", builderManualRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Serve static files from the "public" directory
app.use(express.static('public'));

module.exports = app;
