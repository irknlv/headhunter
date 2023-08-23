const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');
const Resume = require('./Resume')

const Education = sequelize.define('Education', {
  level: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  universityName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  faculty: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  major: {
    type: DataTypes.STRING,
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

Education.belongsTo(Resume, {foreignKey: 'resumeId'});
Resume.hasMany(Education, {foreignKey: 'resumeId', as: 'education'});

module.exports = Education;