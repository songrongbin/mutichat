var Server = require('socket.io');
var io = new Server(5555);
io.on('connection', function (socket) {
    socket.emit('msg', { hi: 'Hello,world' });
    socket.on('msg', function (data) {
        console.log(data);
    });
});