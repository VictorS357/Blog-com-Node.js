const Sequelize = require('sequelize');

const connection = new Sequelize('guiapress', 'root', '705030', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = connection;