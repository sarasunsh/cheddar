const Sequelize = require('sequelize');
const db = require('../db');
const Mouse = db.Mouse;

const Arm = db.define('arm', {
    goal: {
        type: Sequelize.INTEGER
    },
    genotype: {
        type: Sequelize.STRING,
        allowNull: false
    },
    treatment: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    classMethods: {
        getByGenotype: function(genotype){
        return Arm.findAll({
                where : {
                    genotype: genotype
                }
            })
        }
    },
    instanceMethods: {
        countMice: function(){
            return _factory.associations['Mouse'].target.count({ where: { armId: this.id } })
        }
    }
});

module.exports =  Arm;
