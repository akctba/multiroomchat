module.exports.iniciaChat = function (application, req, res) {

    let people = application.get('people');

    var dadosForm = req.body;
    req.assert('apelido', 'Nome ou apelido eh obrigatorio').notEmpty();
    req.assert('apelido', 'Nome ou apelido deve conter entre 3 e 15 caracteres').len(3, 15);
    // verificar se nome ja esta sendo utilizado (se existe na list people)
    var erros = req.validationErrors();

    if (erros) {
        res.render('index', {
            validation: erros
        });
        //render encerra a execucao da funcao
    }

    //sending websocket message
    application.get('io').emit(
        'msgParaCliente', 
        {apelido: dadosForm.apelido, mensagem: ' acabou de entrar no chat'}
    );

    //add user in the people list
    if(people == null || people == '') {
        people = [dadosForm.apelido];
    } else {
        people.push(dadosForm.apelido);
    }

    application.set('people', people);

    //UPDATE PEOPLE LIST
    application.get('io').sockets.emit(
        'peopleParaCliente', 
        {people: people}
    );
    

    res.render('chat', {dadosForm: dadosForm, people: people});
}