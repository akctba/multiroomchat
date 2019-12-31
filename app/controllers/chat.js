module.exports.iniciaChat = function(application, req, res) {
    var dadosForm = req.body;
    req.assert('apelido','Nome ou apelido eh obrigatorio').notEmpty();
    req.assert('apelido','Nome ou apelido deve conter entre 3 e 15 caracteres').len(3, 15);
    // verificar se nome ja esta sendo utilizado
    var erros = req.validationErrors();

    if(erros) {
        res.render('index', {validation: erros});
        //encerra a execucao da funcao
    }

    res.render('chat');
}