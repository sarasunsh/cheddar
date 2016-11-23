const Sequelize = require('sequelize');
const db = require('../db');

const View = db.define('view', {
    smilyScore: {
      type: Sequelize.FLOAT,
      allowNull: false
    }
});


module.exports = View;
