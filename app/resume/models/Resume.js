const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');
const City = require('../../region/City')
const User = require('../../auth/User')
const Country = require('../../region/Country')

const Resume = sequelize.define('Resume', {
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthday: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  about: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  salary: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  salaryType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mainLanguage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  skills: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},
  {
    timestamps: false,
    freezeTableName: true,
  }
);

Resume.belongsTo(City, {foreignKey: 'cityId', as: 'city'});
Resume.belongsTo(User, {foreignKey: 'userId'});
Resume.belongsTo(Country, {foreignKey: 'citizenShip', as: 'country'});

module.exports = Resume;