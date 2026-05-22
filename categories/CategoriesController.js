const express = require('express');
const router = express.Router(); //utiliza-se o router pois não estamos no arquivo principal (index.js)

router.get('/admin/categories/new', (req, res) => {
  res.render('admin/categories/new');
});

module.exports = router;