const express = require('express');
const router = express.Router();
const User = require('./User');
const bcrypt = require('bcrypt');

router.get('/admin/users', (req, res) => {
    User.findAll().then(users => {
        res.render('admin/users/index', {users});
    });
});

router.get('/admin/users/create', (req, res) => {
    res.render('admin/users/create');
});

router.post('/users/create', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({where: {email}}).then(user => {
        if(user == undefined) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);

            User.create({
                email,
                password: hash
            }).then(() => {
                res.redirect('/');
            }).catch(error => {
                res.redirect('/');
            });
        } else {
            res.redirect('/admin/users/create');
        }
    });
});

router.get('/login', (req, res) => {
    res.render('admin/users/login');
});

router.post('/authenticate', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({where: {email}}).then(user => {
        if(user != undefined){ //se existir um usuário com esse email
            //validar senha
            const correct = bcrypt.compareSync(password, user.password);
            //ele vai transformar a senha do usuário em hash e comparar com 
            //a hash da senha salva no banco de dados
            if(correct){
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                res.json(req.session.user);
            } else {
                res.redirect('/login');
            }
        } else {
            res.redirect('/login');
        }
    });
});

module.exports = router;