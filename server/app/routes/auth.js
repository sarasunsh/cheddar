var express = require('express');
var router = express.Router();
var User = require('../../db/models').User;
import passport from 'passport';

module.exports = router;

// router.get('/logout', function (req, res, next) {
//   req.session.destroy();
//   res.sendStatus(204);
// });

// router.post('/signup', function (req, res, next) {

//   User.findOrCreate({
//     where: {
//       email: req.body.email
//     },
//     defaults: {
//       password: req.body.password
//     }
//   })
//   .then(function (user) {
//     req.session.userId = user.id;
//     res.sendStatus(204);
//   });

// });

router.get('/me', function (req, res, next) {
  if (req.user) {
    res.send(req.user);
  } else {
    res.sendStatus(401);
  }
});

// router.use('/google', require('./google'));
