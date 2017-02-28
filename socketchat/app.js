var fs = require('fs')	//�ļ�����
    , http = require('http')	//http������
    , socketio = require('socket.io');	//socket.io��������ǰ̨���н���

var server = http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-type': 'text/html'});
    //��index.html���
    res.end(fs.readFileSync(__dirname + '/index.html'));
}).listen(3000, function() {
    console.log('Listening at: http://localhost:3000');
});

//���ӳɹ��Ļص�
socketio.listen(server).on('connection', function (socket) {
    socket.on('message', function (msg) {
        console.log('���ܵ� ', msg);
        //����Ϣ���͸������ͻ���
        socket.broadcast.emit('message', msg);
    });
});