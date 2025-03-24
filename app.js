require('dotenv').config();
require('dotenv').config({ path: './.env' });
require('@azure/opentelemetry-instrumentation-azure-sdk');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session'); // Add session middleware
const appInsights = require("applicationinsights");

// Set the connection string from environment variable (ensure it's set in your environment)
appInsights.setup(process.env.APPLICATIONINSIGHTS_CONNECTION_STRING || 'YOUR_CONNECTION_STRING')
  .setAutoCollectRequests(true) // Automatically collects HTTP requests
  .setAutoCollectDependencies(true) // Collects telemetry data for dependencies (SQL, etc.)
  //.setSamplingPercentage(50)  // Only send 50% of the telemetry data
  .start();

// You can also set the role name for this instance
appInsights.defaultClient.context.tags[appInsights.defaultClient.context.keys.cloudRole] = 'MyWebApp';

// Log some basic telemetry to check
appInsights.defaultClient.trackEvent({ name: "app_start" });

// Import routers
var indexRouter = require('./routes/index');
var successRouter = require('./routes/success');
var authRouter = require('./routes/auth'); // Import the authentication router
var overviewRouter = require("./routes/overview");
var builderRouter = require("./routes/builder");
var nextStepsRouter = require("./routes/nextSteps");
var deployRouter = require("./routes/deploy");
var builderManualRouter = require("./routes/buildermanual");
var lifecycleWorkflowsRouter = require("./routes/lifecycleworkflows");
var guestaccessRouter = require("./routes/guestaccess");

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
    secret: 'your-secret-key', // Replace with a secure key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production', maxAge: 60 * 60 * 1000 }, // Set true if using HTTPS
  })
);

// Use routers
app.use('/', indexRouter);
app.use('/', successRouter);
app.use('/auth', authRouter); // Use the auth router for authentication routes
app.use("/overview", overviewRouter);
app.use("/builder", builderRouter);
app.use("/nextSteps", nextStepsRouter);
app.use("/deploy", deployRouter);
app.use("/buildermanual", builderManualRouter);
app.use("/lifecycleworkflows", lifecycleWorkflowsRouter);
app.use("/guestaccess", guestaccessRouter);

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

// Set the port
const port = process.env.PORT || 3000;
app.set('port', port);

module.exports = app;
