const { sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const schema = {
    name: DataTypes.STRING,
    year: DataTypes.INT,
    artistId: DataTypes.INT,
  };

  return sequelize.define('Album', schema);
};
