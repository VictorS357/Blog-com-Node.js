const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');

const categoriesController = require('./categories/CategoriesController');
const articlesController = require('./articles/ArticlesController');
const usersController = require('./users/UsersController');

const Category = require('./categories/Category');
const Article = require('./articles/Article');
const User = require('./users/User')

//view engine
app.set('view engine', 'ejs');

//static
app.use(express.static('public'));

//body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//database
connection
  .authenticate()
  .then(() => {
    console.log('Conexão com database feita com sucesso!');
  }).catch(error => {
    console.log(error);
  });

//rotas controller
app.use('/', categoriesController); //utilizar rotas dentro do arquivo --- esse '/' é um prefixo (nesse caso sem prefixo) --- caso tivesse prefixo, ele seria usado sempre antes da rota princpal
app.use('/', articlesController);
app.use('/', usersController);

//rotas
app.get('/', (req, res) => {
  Article.findAll({
    order: [
      ['id', 'DESC']
    ],
    limit: 4
  }).then(articles => {
    Category.findAll().then(categories => {
      res.render('index', {articles, categories});
    });
  });
});

app.get('/:slug', (req, res) => {
  const slug = req.params.slug;
  Article.findOne({
    where: {slug}
  }).then(article => {
    if(article != undefined) {
      Category.findAll().then(categories => {
        res.render('article', {article, categories});
      });
    } else {
      res.redirect('/');
    }
  }).catch(error => {
    res.redirect('/');
  });
});

app.get('/category/:slug', (req, res) => {
  const slug = req.params.slug;
  Category.findOne({
    where: {slug},
    include: [{model: Article}]
  }).then(category => {
    if(category != undefined) {
      Category.findAll().then(categories => {
        res.render('index', {articles: category.articles, categories});
      }); 
    } else {
      res.redirect('/');
    }
  }).catch(error => {
    res.redirect('/');
  });
});

app.listen('8080', () => {
  console.log('O servidor está rodando!');
});