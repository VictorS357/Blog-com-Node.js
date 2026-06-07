const express = require('express');
const router = express.Router(); //utiliza-se o router pois não estamos no arquivo principal (index.js)
const Category = require('../categories/Category');
const Article = require('./Article');
const slugify = require('slugify');

router.get('/admin/articles', (req, res) => {
  Article.findAll({
    include: [{model: Category}]
  }).then(articles => {
    res.render('admin/articles/index', {articles});
  });
});

router.get('/admin/articles/new', (req, res) => {
  Category.findAll().then(categories => {
    res.render('admin/articles/new', {categories});
  })
});

router.post('/articles/save', (req, res) => {
  const title = req.body.title;
  const body = req.body.body;
  const category = req.body.category;

  Article.create({
    title,
    slug: slugify(title),
    body,
    categoryId: category
  }).then(() => {
    res.redirect('/admin/articles');
  });
});

router.get('/admin/articles/edit/:id', (req, res) => {
  const id = req.params.id;

  if(isNaN(id)) {
    res.redirect('/admin/articles');
  }

  Article.findByPk(id).then(article => {
    if(article.id != undefined) {
      Category.findAll().then(categories => {
        res.render('admin/articles/edit', {article, categories});
      });
    } else {
      res.redirect('/admin/articles');
    }
  }).catch(error => {
    res.redirect('/admin/articles');
  });
});

router.post('/articles/update', (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const body = req.body.body;
  const category = req.body.category;

  Article.update({title, slug: slugify(title), body, categoryId: category}, {
    where: {id}
  }).then(() => {
    res.redirect('/admin/articles')
  }).catch(error => {
    res.redirect('/');
  });
});

router.post('/articles/delete', (req, res) => {
  const id = req.body.id
  if(id != undefined) {
    if(!isNaN(id)) { 
      Article.destroy({
        where: {id}
      }).then(() => {
        res.redirect('/admin/articles');
      });
    } else { // não for um número
      res.redirect('/admin/articles');
    }
  } else { // null
    res.redirect('/admin/articles');
  }
});

module.exports = router;