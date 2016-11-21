const Sequelize = require('sequelize');
const db = require('../db');

const Ad = db.define('ad', {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    url: {
      type: Sequelize.STRING,
      allowNull: false
    }
});


module.exports =  Ad;
