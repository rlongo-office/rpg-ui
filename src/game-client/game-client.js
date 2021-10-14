import SockJS from "sockjs-client";
import WebStompClient from 'webstomp-client';

// define the game service resources here
let _isConnected = false;
let _socket = null;
let _stompClient = null;

// eslint-disable-next-line no-unused-vars
const _eventHandlers = {
    'connect': [], // functions to call when a connect event occurs
    'disconnect': [],
    'message': [],
};

// eslint-disable-next-line no-unused-vars
const messageHandler = (messageType, body) => {
    // fire the 'connect' callbacks
    const event = {
        messageType, body
    }; // event deatils
    for(let listener in _eventHandlers['message']) {
        listener.call(event);
    }
}


const connectionSuccess = () => {
    _isConnected = true;

    // register ''default' message channel listeners
    this.stompClient.subscribe('/topic/chat',message => messageHandler('general', message));
    this.stompClient.subscribe('/user/queue/message', message => messageHandler('private', message));

    // fire the 'connect' callbacks to all registered connect listeners
    const event = {}; // event deatils
    for(let listener in _eventHandlers['connect']) {
        listener.call(event);
    }
}

const connectionError = (error) => {
    console.log(error);
    _isConnected = false;
}

export default {
    registerEventListener(type, eventListener) { //type is the event type string, eventListener - callback
        const listeners = _eventHandlers[type];

        if(!listeners) {
            _eventHandlers[listeners] = [];
        }

        _eventHandlers[listeners].push(eventListener);
    },
    connect(username, password) {
        _isConnected = false;
        _socket = new SockJS("http://localhost:8090/game-app");
        _stompClient = WebStompClient.over(_socket);
        _stompClient.connect({username, password}, connectionSuccess, connectionError);
    },

    async disconnect() {
        _isConnected = false;
    },

    sendMessage(msg) {
        let type = msg.type;
        let body = msg.body;
        //const { user, channel, body} = message;
        console.log("Sending message:" + body);
        if (_stompClient && _isConnected) {
          _stompClient.send("/app/chat", body, {});
        }
        switch(type){
            case "Party": _stompClient.send("/app/chat", body, {}); break;
            case "Private": _stompClient.send("/app/chat", body, {}); break;
            case "Roll": _stompClient.send("/app/chat", body, {}); break;
        }
        //some code to send over the "/chat" url?
    },

    get isConnected() {
        return _isConnected;
    }
};
/*
            this.connected = true;
            console.log(frame);
              this.stompClient.subscribe('/topic/chat', (message)=> {
                  console.log("You have recieved a chat message:" + message);
                  this.msgCount += 1;
                  this.isPrivate = false;
                  const chatMessage = JSON.stringify(message.body);
                  const newMessage = {"id":this.msgCount,"type":"G","body":chatMessage}
                  //this.received_messages.push(chatMessage);
                  this.allMessages.push(newMessage);
              });
              this.stompClient.subscribe('/user/queue/message', (message)=> {
                  this.msgCount += 1;
                  this.isPrivate = true;
                  const chatMessage = JSON.stringify(message.body);
                  const newMessage = {"id":this.msgCount,"type":"P","body":chatMessage}
                  //this.received_messages.push(newMessage);
                  this.allMessages.push(newMessage);
              });
            //this.stompClient.subscribe("/topic/greetings", tick => {
            //  console.log(tick);
            //  this.received_messages.push(JSON.parse(tick.body).content);
            // });
          },
          error => {
            console.log(error);
            this.connected = false;
          }
        
*/