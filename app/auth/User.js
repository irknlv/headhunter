const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const Role = require('./Role');
const Company = require('./Company');

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
        isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
},
  {
    timestamps: false,
    freezeTableName: true,
  }
);
User.belongsTo(Role, { foreignKey: 'roleId' });
User.belongsTo(Company, { foreignKey: 'companyId' });

module.exports = User;