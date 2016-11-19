'use strict';
import path, {resolve} from 'path';
import express from 'express';

var User = require('../db/models').User;
import passport from 'passport';
import { Strategy } from 'passport-local';

const app = express();

// const env = require('path.join(rootPath, './server/env'));

// Export app
module.exports = app;

// Logging middleware
import logMiddleware from 'volleyball';
app.use(logMiddleware);

// Parsing middleware
import bodyParser from 'body-parser';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static middleware
import favicon from 'serve-favicon';
const faviconPath = path.join(__dirname, '../../public/favicon.ico');
const publicPath = path.join(__dirname, '../../public');

app.use(favicon(faviconPath));
app.use(express.static(publicPath));
// app.use('/bootstrap', express.static(resolve(__dirname, '..', '..', 'node_modules', 'bootstrap', 'dist')))
app.use('/materialize-css', express.static(resolve(__dirname, '..', '..', 'node_modules', 'materialize-css', 'dist')));
app.use('/jquery', express.static(resolve(__dirname, '..', '..',  'node_modules', 'jquery', 'dist')))

// PASSPORT MIDDLEWARE

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.

passport.use('local', new Strategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    function(username, password, cb) {
        User.findOne({
            where: {
              email: username,
            }
        })
        .then(user => {
            console.log('made it into THEN', user)
          if(!user) {
            cb(null, false, {message: "Unknown user"})
          } else if (password != user.password) {
            cb(null, false, {message: 'Invalid password'})
          } else {
            cb(null, user);
          }
        })
        .catch(err => {
          console.log("error from passport", err);
          cb(err);
        });
    }
));

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  User.findById(id)
  .then((user) => {
    cb(null, user);
  })
  .catch(err => {
    return cb(err);
  })
});


app.post('/login',
  passport.authenticate('local', { successRedirect: '/video',
                                   failureRedirect: '/auth' }));

// Routes that will be accessed via AJAX should be prepended with
// /api so they are isolated from our GET /* wildcard.
app.use('/api', require('./routes'));


// React-Router browserHistory requirement: this will handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, '../../browser/index.html'))
})

// Error catching endware.
app.use(function (err, req, res, next) {
    console.error(err, typeof next);
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});
