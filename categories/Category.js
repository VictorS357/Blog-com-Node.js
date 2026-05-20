const Sequelize = require('sequelize');
const connection = require('../database/database');

const Category = connection.define('categories', {
  title:{
    type: Sequelize.STRING,
    allowNull: false
  },
  slug:{
    type: Sequelize.STRING,
    allowNull: false
  }
});
/*
Slug é basicamente uma versão do título que seria utilizado em uma rota. Ex:
  Título = Desenvolvimento web
  Slug = desenvolvimento-web
*/

module.exports = Category;