/* importar configuracoes do servidor */
var app = require('./config/server');

/* parametrizar a porta de escuta */
var server = app.listen(80, function() {
    console.log('Server running...');
});

// adding the websocket protocol to the same port 80
var io = require('socket.io').listen(server);
/* criar a conexao por websocket */
io.on('connection', function(socket){
    console.log('New user connected');

    socket.on('disconnect', function(){
        console.log('User disconnected');
    });
});