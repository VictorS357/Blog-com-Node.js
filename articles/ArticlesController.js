const express = require('express');
const router = express.Router(); //utiliza-se o router pois não estamos no arquivo principal (index.js)

router.get('/articles', (req, res) => {
  res.send('Rota de artigos');
});

router.get('/admin/articles/new', (req, res) => {
  res.send('rota para criar novo artigo');
});

module.exports = router;