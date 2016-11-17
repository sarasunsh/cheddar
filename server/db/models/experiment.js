const Sequelize = require('sequelize');
const db = require('../db');

const Experiment = db.define('experiment', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },

});

module.exports =  Experiment;
