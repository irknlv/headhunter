const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');
const City = require('../../region/City')
const User = require('../../auth/User')
const Specialization = require('../../specialization/models/Specialization');
const Company = require('../../auth/Company');
const Experience = require('./Experience');
const EmploymentType = require('../../employmentType/EmploymentType')

const Vacancy = sequelize.define('Vacancy', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  salaryFrom: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  salaryTo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  salaryType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  skills: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  aboutCompany: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
},
  {
    freezeTableName: true,
  }
);

Vacancy.belongsTo(City, {foreignKey: 'cityId', as: 'city'});
Vacancy.belongsTo(User, {foreignKey: 'userId', as: 'user'});
Vacancy.belongsTo(Company, {foreignKey: 'companyId', as: 'company'});
Vacancy.belongsTo(Specialization, {foreignKey: 'specializationId', as: 'specialization'});
Vacancy.belongsTo(Experience, {foreignKey: 'experienceId', as: 'experience'});
Vacancy.belongsTo(EmploymentType, {foreignKey: 'employmentTypeId', as: 'employmentType'});

module.exports = Vacancy;