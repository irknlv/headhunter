const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');
const Resume = require('./Resume')

const WorkingHistory = sequelize.define('WorkingHistory', {
  companyName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  companyDescription: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  responsibilities: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
},
  {
    timestamps: false,
    freezeTableName: true,
  }
);

WorkingHistory.belongsTo(Resume, {foreignKey: 'resumeId'});
Resume.hasMany(WorkingHistory, {foreignKey: 'resumeId', as: 'workingHistories'});

module.exports = WorkingHistory;