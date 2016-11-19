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



router.get('/me', function (req, res, next) {
  console.log(req.session)
  if (req.user) {
    res.send(req.user);
  } else {
    res.sendStatus(401);
  }
});
