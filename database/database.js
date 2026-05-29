const Sequelize = require('sequelize');

const connection = new Sequelize('victorpress', 'root', '705030', {
  host: 'localhost',
  dialect: 'mysql',
  timezone: '-03:00'
});

module.exports = connection;