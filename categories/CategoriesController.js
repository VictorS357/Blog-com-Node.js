const express = require('express');
const router = express.Router(); //utiliza-se o router pois não estamos no arquivo principal (index.js)
const Category = require('./Category');
const slugify = require('slugify'); //biblioteca que faz o título se transformar em uma versão otimizada para url. Ex: title = Desenvolvimento web, slug = desenvolvimento-web

router.get('/admin/categories/new', (req, res) => {
  res.render('admin/categories/new');
});

router.post('/categories/save', (req, res) => {
  const title = req.body.title;

  if (title != undefined) {
    Category.create({
      title,
      slug: slugify(title)
    }).then(() => {
      res.redirect('/');
    });

  } else {
    res.redirect('/admin/categories/new');
  }
});

module.exports = router;