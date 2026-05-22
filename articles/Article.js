const Sequelize = require('sequelize');
const connection = require('../database/database');
const Category = require('../categories/Category');

const Article = connection.define('articles', {
  title:{
    type: Sequelize.STRING,
    allowNull: false
  },
  slug:{
    type: Sequelize.STRING,
    allowNull: false
  },
  body:{
    type: Sequelize.TEXT,
    allowNull: false
  }
});

//relacionamentos
Category.hasMany(Article); //UMA categoria tem muitos artigos. 1:M
Article.belongsTo(Category); //UM artigo pertence a uma categoria. 1:1

// Article.sync({force: true});
// essa linha acima serve para criar as tabelas no banco de dados de forma a sincronizar com o relacionamento escrito
// depois que a tabela for criada uma vez, o código deve ser removido

module.exports = Article;