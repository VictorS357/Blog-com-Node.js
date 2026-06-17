const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const connection = require('./database/database');

const categoriesController = require('./categories/CategoriesController');
const articlesController = require('./articles/ArticlesController');
const usersController = require('./users/UsersController');

const Category = require('./categories/Category');
const Article = require('./articles/Article');
const User = require('./users/User')

//view engine
app.set('view engine', 'ejs');

//sessions
app.use(session({
  secret: "aksndjakndkjankdssankja", cookie: {maxAge: 300000000} //secret é como se fosse uma senha para decriptar suas sessões
}))
//o express-sessions guarda as informações das sessões no storage do servidor (utiliza memória ram do computador)
//em sistemas de médio a grande porte, não é recomendado utilizar esse sistema de armazenamento
//por isso, existe um banco de dados focado em salvamento de sessões, chamado Redis

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

//teste de sessão
app.get('/session', (req, res) => {
  req.session.user = {
    username: "Victor357",
    email: "victorfransousa357@gmail.com",
    id: 10
  };
  req.session.year = 2026;
  req.session.course = "Formação Node.js";

  res.send('Sessão gerada!');
});

app.get('/read', (req, res) => {
  res.json({
    user: req.session.user,
    year: req.session.year,
    course: req.session.course
  })
});

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