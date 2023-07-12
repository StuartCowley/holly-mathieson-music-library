const { Sequelize } = require('sequelize');
const ArtistModel = require('./artists');

const setUpDatabase = () => {
  const connection = new Sequelize('music-library', 'root', 'password', {
    host: 'localhost',
    port: 3307,
    dialect: 'postgres',
  });
  const Artist = ArtistModel(connection, Sequelize);
  connection.sync({ alter: true });

  return { Artist };
};

module.exports = setUpDatabase();
