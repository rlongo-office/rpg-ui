import store from '../store';
import SockJS from "sockjs-client";
import WebStompClient from 'webstomp-client';

// define the game service resources here
let _isConnected = false;
let _socket = null;
let _stompClient = null;

const messageHandler = (message) => {
  // fire the 'connect' callbacks
  const gameMessage = JSON.parse(message.body);
  let type = gameMessage.type;
  console.log("message-service:message callback for type :" + type);
  switch(type){
    case 'party': 
    case 'private':
        store.dispatch('addChatMessage', gameMessage); break;
    case 'character':
        store.dispatch('loadCharacter',gameMessage); break;
    case 'image':
        store.dispatch('loadImage',gameMessage); break;
    case 'action':
    case 'lore': break;
}
}

export default {
    async connect(username, password) {
        return new Promise((resolve, reject) =>{
          _socket = new SockJS("http://localhost:8095/game-app");
          _stompClient = WebStompClient.over(_socket);
          _stompClient.connect(
              {username, password},
              frame =>{
                  console.log(frame);
                  _isConnected = true;
                  store.dispatch('setConnected', true);
                  _stompClient.subscribe('/topic/chat', message=>messageHandler(message));
                  _stompClient.subscribe('/user/queue/message', message=>messageHandler(message));
                  resolve();
              },
              error => {
                console.log(error);
                _isConnected = false;
                reject();
              }
          );    
        });    
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
                case 'character':
                        _stompClient.send("/app/messages", msgString, {}); break;
                case 'image':
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