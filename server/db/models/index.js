'use strict';

const Sequelize = require('sequelize');
const db = require('../db');

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('Song')
// to get access to the Song model.

const User = require('./user');
const Ad = require('./ad');

// Form the associations
const View = db.define('view', {smilyScore: Sequelize.FLOAT});
View.belongsTo(User);
View.belongsTo(Ad);

User.hasMany(View);
Ad.hasMany(View);

// exported just in case, but can also be fetched via db.model('Mouse') etc.
module.exports = {
  User,
  Ad,
  View
};
