/* importar configuracoes do servidor */
var app = require('./config/server');

/* parametrizar a porta de escuta */
var server = app.listen(80, function() {
    console.log('Server running...');
});

// adding the websocket protocol to the same port 80
var io = require('socket.io').listen(server);

app.set('io', io);

/* criar a conexao por websocket */
io.on('connection', function(socket){
    console.log('New user connected');

    socket.on('disconnect', function(){
        console.log('User disconnected ');
        

    });

    socket.on('msgParaServidor', function(data){
        //DIALOG
        //to the current user
        socket.emit(
            'msgParaCliente', 
            {apelido: data.apelido, mensagem: data.mensagem}
        );
        //to all users except the current
        socket.broadcast.emit(
            'msgParaCliente', 
            {apelido: data.apelido, mensagem: data.mensagem}
        );

        
    });
});