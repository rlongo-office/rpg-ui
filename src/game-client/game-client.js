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
    'load': [],
};

// eslint-disable-next-line no-unused-vars

const messageHandler = (messageType, body) => {
    messageType = "";
    body = "";
    // fire the 'connect' callbacks
    const event = {
        messageType, body
    }; // event deatils
    for(let listener in _eventHandlers['message']) {
        listener.call(event);
    }
    return {messageType: messageType, body: body}

}


const connectionSuccess = () => {
    _isConnected = true;

    // register ''default' message channel listeners
    _stompClient.subscribe('/topic/chat',message => messageHandler('general', message));
    _stompClient.subscribe('/user/queue/message', message => messageHandler('private', message));

    // fire the 'connect' callbacks to all registered connect listeners
    const event = {type: 'connect', success: true}; // event deatils
    for(let listener of _eventHandlers['connect']) {
        //console.log('listener', {listener})
        listener(event);
    }
}

const connectionError = (error) => {
    console.log(error);
    _isConnected = false;
}

export default {
    addGameEventListener(type, eventListener) { //type is the event type string, eventListener - callback
        const listeners = _eventHandlers[type];

        if(!listeners) {
            _eventHandlers[type] = [];
        }

        _eventHandlers[type].push(eventListener);
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
        //const { user, channel, body} = message;
        if (_stompClient && _isConnected) {

            switch(type){
                case "party": _stompClient.send("/app/chat", msg, {}); break;
                case "private": _stompClient.send("/app/messages", msg, {}); break;
            }
        }
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