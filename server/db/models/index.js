'use strict';


// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('Song')
// to get access to the Song model.

const User = require('./user');

// Form the associations


// exported just in case, but can also be fetched via db.model('Mouse') etc.
module.exports = {
  User
};
