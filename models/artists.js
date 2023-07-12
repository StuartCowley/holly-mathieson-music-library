const { sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const schema = {
    name: DataTypes.STRING,
    genre: DataTypes.STRING,
  };

  return sequelize.define('Artist', schema);
};
