const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../lib/db');

class Developer extends Model {}

Developer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      defaultValue: 'Anonymous',
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    technologies: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
    level: {
      type: DataTypes.ENUM,
      values: ['fresher', 'intermediate', 'experienced'],
    },
  },
  {
    sequelize,
    modelName: 'developer',
  }
);

Developer.sync().then(() => {
  console.log('Table created');
});

module.exports = Developer;
