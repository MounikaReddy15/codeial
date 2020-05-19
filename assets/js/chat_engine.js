// communicating from the client side, frontend
class ChatEngine {
    constructor(chatBoxId, userEmail) {
        this.chatBox = $(` #${chatBoxId}`);
        this.userEmail = userEmail;

        // initiate the connection
        // io is the global var, given by the cds file
        this.socket = io.connect('http://localhost:5000');

        // connHan wont get called automatically
        // we have to call it in const'or
        if(this.userEmail) {
            this.connectionHandler();
        }
    }

    // this will have to & fro interaction bw the observer and the subscriber
    // on means detecting an event
    // first event that takes place on socket is connection(connecting)
    connectionHandler() {
        let self = this;
        this.socket.on('connect', function(){
            console.log('connection establishes using sockets');


            // ask for joining a room
            self.socket.emit('join_room', {
                
                user_email: self.userEmail,
                // the room which i want to join
                chatroom: 'codeial'

            });

            self.socket.on('user_joined', function(data) {
                console.log('a user joined', data);
            });
        });

         // send a message on clicking the send message button
         $('#send-message').click(function() {
             let msg = $('#chat-message-input').val(); 

             if(msg != '') {
                 self.socket.emit('send_message', {
                     message: msg,
                     user_email: self.userEmail, 
                     chatroom: 'codeial'

                 });
             }
         });

         self.socket.on('receive_message', function(data) {
            console.log('message received', data.message);

            let newMessage = $('<li>');

            let messageType = 'other-message';

            if(data.user_email == self.userEmail) {
                messageType = 'self-message';
            }

            newMessage.append($('<span>',{
                'html': data.message
            }));

            newMessage.append($('<sub>', {
                // who sent the msg
                'html': data.user_email
            }));
             
            newMessage.addClass(messageType);

            $('#chat-messages-list').append(newMessage);
         });

 }
}

// as soon as the class is initialized, connection req is sent
// connH detects using socket