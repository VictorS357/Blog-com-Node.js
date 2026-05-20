const express = require('express');
const router = express.Router(); //utiliza-se o router pois não estamos no arquivo principal (index.js)

router.get('/categories', (req, res) => {
  res.send('Rota de categorias');
});

router.get('/admin/categories/new', (req, res) => {
  res.send('rota para criar nova categoria');
});

module.exports = router;