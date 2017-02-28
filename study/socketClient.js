var socket = io("ws://localhost:5555");
socket.on('msg',function(data){
    socket.emit('msg', {rp:"fine,thank you"});
    console.log(data);
});