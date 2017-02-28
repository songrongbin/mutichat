/**
 * # InitCtrl
 */
angular.module('chatApp').controller('InitCtrl', function($scope) {
    var socket = io.connect('http://127.0.0.1:3000');
    socket.on('nameResult', function(result) {
        var message;
        if (result.success) {
            message = 'you are now known as ' + result.name + '.';
            console.log('message=', message);
            document.getElementById('guestname').innerHTML = message;
        } else {
            message = result.message;
        }
    });

    socket.on('joinResult', function(result) {
        document.getElementById('room').innerHTML = result.room;
    });


    $scope.sendMessage = function() {
        var message = {
            room: 'Lobby',
            text: document.getElementById('user_input').value
        };
        socket.emit('message', message);
    };

    socket.on('message', function(message) {
        var p = document.createElement('p');
        p.innerHTML = message.text;
        document.getElementById('message').appendChild(p);
    });

});