
// the observer(server) receive incoming connections from all the users, the subscribers(listeners)
// whenever a connection req is received, it automatically sends an acknowledgement to the frontent user who establised the conn
module.exports.chatSockets = function(socketServer) {
    let io = require('socket.io')(socketServer);

    io.sockets.on('connection', function(socket) {
        console.log('new connection received', socket.id);

        // whenevr client disconnects an auto'tic disconnect event is fired
        socket.on('disconnect', function(){
            console.log('socket disconnected');
        });

        // when chatroom event is emitted, it is received here
        socket.on('join_room' , function(data) {
            console.log('joining request received', data);
        
        // join that particular room
        // if chatroom exists it connects to that
        // else its creates the chatroom and enter the user into it
        socket.join(data.chatroom);

        // others shud receive notification that she/he joined the chatroom
        // event names shudn't have spaces
        io.in(data.chatroom).emit('user_joined', data);
    });

    // detect send_message and broadcast to everyone in the room
    socket.on('send_message', function(data) {
        io.in(data.chatroom).emit('receive_message', data);
    });
});
}