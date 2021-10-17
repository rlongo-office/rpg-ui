import store from '../store';
import SockJS from "sockjs-client";
import WebStompClient from 'webstomp-client';

// define the game service resources here
let _isConnected = false;
let _socket = null;
let _stompClient = null;

export default {
    
    connect(username, password) {
        _socket = new SockJS("http://localhost:8090/game-app");
        _stompClient = WebStompClient.over(_socket);
        _stompClient.connect(
            {username, password},
            frame =>{
                console.log(frame);
                _isConnected = true;
                store.dispatch('setConnected', true);
                _stompClient.subscribe('/topic/chat', (message)=> {
                    console.log("Callback - chat message received");
                    console.log(message.body);
                    const chatMessage = JSON.parse(message.body);
                    console.log(chatMessage.body);
                    store.dispatch('addChatMessage', chatMessage);
                });
                _stompClient.subscribe('/user/queue/message', (message)=> {
                    console.log("Callback - chat message received:" + message);
                    const chatMessage = JSON.parse(message);
                    store.dispatch('addChatMessage', chatMessage);
                });
            },
            error => {
            console.log(error);
            _isConnected = false;
            }
        );        
    },
    sendMessage(msg) {
        let type = msg.type;
        let msgString = JSON.stringify(msg);
        console.log("message-service sendMessage " + msgString);
        //const { user, channel, body} = message;
        if (_stompClient && _isConnected) {

            switch(type){
                case 'party': 
                        _stompClient.send("/app/chat", msgString, {}); break;
                case 'private':
                         _stompClient.send("/app/messages", msgString, {}); break;
            }
        }
    }
}
/*
  connect: function() {
              this.socket = new SockJS("http://localhost:8090/game-app");
              this.stompClient = WebStompClient.over(this.socket);
              this.connected = true;
              this.stompClient.connect(
                { username: this.userName,},
                frame =>{
                    console.log(frame);
                    this.stompClient.subscribe('/topic/chat', (message)=> {
                      console.log("You have recieved a chat message:" + message);
                      this.msgCount += 1;
                      const chatMessage = JSON.stringify(message.body);
                      const newMessage = {"id":this.msgCount,"type":"G","body":chatMessage}
                      this.allMessages.push(newMessage);
                   });
                    this.stompClient.subscribe('/user/queue/message', (message)=> {
                      this.msgCount += 1;
                      const chatMessage = JSON.stringify(message.body);
                      const newMessage = {"id":this.msgCount,"type":"P","body":chatMessage}
                      //this.received_messages.push(newMessage);
                      this.allMessages.push(newMessage);
                    });
                },
                error => {
                  console.log(error);
                  this.connected = false;
                }
              );        
            },
    disconnect() {
      if (this.stompClient) {
        this.stompClient.disconnect();
      }
      this.connected = false;
    },
    tickleConnection() {
      this.connected ? this.disconnect() : this.connect();
    },
    classSelector() {
    }
  },
  mounted() {
    // this.connect();
  }
};
</script>
*/