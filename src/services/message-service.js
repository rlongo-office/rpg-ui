import store from '../store';
import SockJS from "sockjs-client";
import WebStompClient from 'webstomp-client';
import axios from "../../node_modules/axios/lib/axios.js"

// define the game service resources here
let _isConnected = false;
let _socket = null;
let _stompClient = null;
const endpoint = 'https://data.mongodb-api.com/app/data-xuvxd/endpoint/data/beta';
const clusterName = "Cluster0"
const apikey = "1qwvrQgPulmVNGsRbMLQcad2J5aQHBeWn3KbG8EfFIJ9s18SBNu5D3R68D4a7f0J";


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
          _socket = new SockJS("https://rpg-dnd-server.herokuapp.com/game-app");
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
    },

    async getCreatures(){
      //const query = { name: { $regex: ``, $options: 'i' } }
      const findEndpoint = endpoint + '/action/find'
      /*
      const payload = { 
        collection: "creatures", 
        database: "D20RPG-DATA", 
        dataSource: clusterName
      }
      */
      var config = {
        method: 'POST',
        mode: 'no-cors',
        url: findEndpoint,
        headers: { 
          "api-key": apikey,
          'Content-Type': 'application/json',
          'Access-Control-Request-Headers': '*'
        },
        data: JSON.stringify({
          "dataSource": clusterName, 
          "database": "D20RPG-DATA", 
          "collection": "creatures",
        }),
      }

      axios(config)
        .then(function (response){
            console.log(JSON.stringify(response.data));
          })
          .catch(function(error) {
            console.log(error);
          });
  },
    getItems(){

    },
    getActors(){

    },
    getStorylines(){

    },
    getZones(){

    },

}
