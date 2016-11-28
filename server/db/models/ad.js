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
    },
    cost: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    category: {
        type: Sequelize.STRING
    }
}, {
    hooks: {
      afterFind: function(user){
        if (user){
          return Views.findAll({
            where: {userId: user.id},
            include: [
              { model: Ads, required: true}
            ]
          })
          .then(ret => {
            let total = 0;
            ret.forEach(e => {
              total += (e.smilyScore / 100) * e.ad.cost;
            })
            user.set('earnedPay',"$" + parseFloat(Math.round(total * 100) / 100).toFixed(2));
          })
        }
      }
  }
});


module.exports =  Ad;
