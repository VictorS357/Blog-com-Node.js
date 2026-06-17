const express = require('express');
const router = express.Router(); //utiliza-se o router pois não estamos no arquivo principal (index.js)
const Category = require('./Category');
const slugify = require('slugify'); //biblioteca que faz o título se transformar em uma versão otimizada para url. Ex: title = Desenvolvimento web, slug = desenvolvimento-web
const adminAuth = require('../middlewares/adminAuth');

router.get('/admin/categories/new', adminAuth , (req, res) => {
  res.render('admin/categories/new');
});

router.post('/categories/save', (req, res) => {
  const title = req.body.title;

  if(title != undefined) {
    Category.create({
      title,
      slug: slugify(title)
    }).then(() => {
      res.redirect('/admin/categories');
    });

  } else {
    res.redirect('/admin/categories/new');
  }
});

router.get('/admin/categories', adminAuth , (req, res) => {
  Category.findAll().then(categories => {
    res.render('admin/categories', {categories});
  });
});

router.post('/categories/delete', (req, res) => {
  const id = req.body.id
  if(id != undefined) {
    if(!isNaN(id)) { 
      Category.destroy({
        where: {
          id
        }
      }).then(() => {
        res.redirect('/admin/categories');
      });
    } else { // não for um número
      res.redirect('/admin/categories');
    }
  } else { // null
    res.redirect('/admin/categories');
  }
});

router.get('/admin/categories/edit/:id', adminAuth , (req, res) => {
  const id = req.params.id;
  if(isNaN(id)) {
    res.redirect('/admin/categories'); 
  }

  Category.findByPk(id).then(category => {
    if(category != undefined) {
      res.render('admin/categories/edit', {category});
    } else {
      res.redirect('/admin/categories');
    }
  }).catch(error => {
    res.redirect('/admin/categories');
  });
});

router.post('/categories/update', (req, res) => {
  const id = req.body.id;
  const title = req.body.title;

  Category.update({title, slug: slugify(title)}, {
    where: {id}
  }).then(() => {
    res.redirect('/admin/categories');
  });
});
module.exports = router;