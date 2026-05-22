const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');

const categoriesController = require('./categories/CategoriesController');
const articlesController = require('./articles/ArticlesController');

const Category = require('./categories/Category');
const Article = require('./articles/Article');

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

//rotas
app.get('/', (req, res) => {
  res.render('index');
});

app.listen('8080', () => {
  console.log('O servidor está rodando!');
});