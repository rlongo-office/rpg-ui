import game from '../game-client/game-client';
import store from '../store';

// register event handlers
/*
There are currently five types of interactions that can occur with the server. 1) General Chat to all users, 2) Private chat from one user to another (includes DM)
3) Game Action (move, cast, attack, skill, save-roll, etc), 4) character data exchange, 5) binary data exchange
*/

// hander to detect a succesful connected event
game.addGameEventListener('connect', (event)=>{
    console.log(event);
    // what to do when we are connected

    // update the store with connected status
    store.dispatch('setConnected', true);
});

// hander to detect a succesful connected event
game.addGameEventListener('receive-message', (event)=>{
    console.log(event);
    // what to do when we send a message

    // update the store with connected status
    store.dispatch('addChatMessage', event);
});
//Load server side data on the character
/*
game.addGameEventListener('connect', (event)=>{
    console.log("Loading character data for" + event);
    // code to load and store the character data
    // update the store with connected status
    store.dispatch('addChatMessage', event.msg);
});
*/

export default {
    
    connect(username, password) {
        game.connect(username,  password);
    },
    sendMessage(msg) {
        console.log("game-service called with message: " + JSON.stringify(msg));
        game.sendMessage(msg);
    }
    
}