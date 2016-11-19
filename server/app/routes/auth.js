var express = require('express');
var router = express.Router();
var User = require('../../db/models').User;
import passport from 'passport';
import { Strategy } from 'passport-local';


module.exports = router;

router.get('/logout', function (req, res, next) {
  req.session.destroy();
  res.sendStatus(204);
});

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


router.post('/signup', function (req,res,next) {
  console.log("SIGNUP",req.body)
  User.create(req.body)
  .then(user => res.send(user))
  .catch(err => console.error(err))
})

router.get('/me', function (req, res, next) {
  console.log(req.session)
  if (req.user) {
    res.send(req.user);
  } else {
    res.sendStatus(401);
  }
});

// router.use('/google', require('./google'));
