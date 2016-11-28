'use strict';

const Sequelize = require('sequelize');
const db = require('../db');

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const User = require('./user');
const Ad = require('./ad');
const View = require('./view');
const Advertiser = require ('./advertiser')

// Form the associations
View.belongsTo(User);
View.belongsTo(Ad);

Ad.belongsTo(Advertiser);
Advertiser.hasMany(Ad);
User.hasMany(View);
Ad.hasMany(View);

// exported just in case, but can also be fetched via db.model('User') etc.
module.exports = {
  User,
  Ad,
  View,
  Advertiser
};
