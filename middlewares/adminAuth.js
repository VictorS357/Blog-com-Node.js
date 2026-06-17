function adminAuth(req, res, next){
    if(req.session.user != undefined){
        next();
    } else {
        res.redirect('/login');
    }
}

//um middleware basicamente é uma função que fica entre a requisição do usuário e a resposta do servidor
//ou seja, sempre que o usuário mandar uma requisição para o servidor, essa requisição sempre passará pelo middleware
//se ele estiver plugado na rota

//nesse caso, é uma autenticação onde somente se o usuário tiver uma sessão
//ele acessará as rotas do painel administrativo

module.exports = adminAuth;