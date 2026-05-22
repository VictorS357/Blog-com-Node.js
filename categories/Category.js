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

// Category.sync({force: true});
// essa linha acima serve para criar as tabelas no banco de dados de forma a sincronizar com o relacionamento escrito
// depois que a tabela for criada uma vez, o código deve ser removido


module.exports = Category;