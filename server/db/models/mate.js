const Sequelize = require('sequelize');
const db = require('./_db');

const Mate = db.define('mate', {
    date: {
        type: Sequelize.DATE
    }
});

module.exports = Mate;
