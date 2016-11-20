var express = require('express');
var auth = express.Router();
var User = require('../../db/models').User;
import passport from 'passport';
var LocalStrategy = require('passport-local').Strategy;



// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(username, password, done) {
    User.findOne({ where:{email: username }})
    .then(user => {
      if (!user) { return done(null, false); }
      return user.authenticate(password)
        .then(ok => {
          if (!ok){
            return done(null, false);
          } else {
            return done(null, user);
          }
        }
      );
    })
    .catch(done)
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

auth.post('/login',
  passport.authenticate('local'),
  function(req, res) {
     res.send('/video');
  })


auth.post('/signup', function (req,res,next) {
    User.findOne( { where: { email: req.body.email }})
    .then(user => {
        if (user) {
            console.log('User already exists.');
            res.send('/login');
        } else {
            return User.create(req.body)
                .then(user => {
                  req.login(user, function(err) {
                    if (err) { return next(err); }
                    res.send('/video')
                  });
                })
        }
    })
    .catch(err => console.error(err))
})

auth.get('/logout', function (req, res, next) {
    req.session.destroy();
    res.sendStatus(204);
});

auth.get('/me', function (req, res, next) {
    if (req.user) {
        res.send(req.user);
    } else {
        res.sendStatus(401);
    }
});

module.exports = auth;
