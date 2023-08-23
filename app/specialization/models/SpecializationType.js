const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');

const SpecializationType = sequelize.define('SpecializationType', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},
  {
    timestamps: false,
    freezeTableName: true,
  }
);


module.exports = SpecializationType;