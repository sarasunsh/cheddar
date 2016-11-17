'use strict';


// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('Song')
// to get access to the Song model.

const Mouse = require('./mouse');
const Arm = require('./arm');
const Experiment = require('./experiment');

// Form the associations
Mouse.belongsTo(Arm);
Arm.belongsTo(Experiment)
Experiment.hasMany(Arm);
Arm.hasMany(Mouse);

// exported just in case, but can also be fetched via db.model('Mouse') etc.
module.exports = {
  Mouse: Mouse,
  Arm: Arm,
  Experiment: Experiment
};
