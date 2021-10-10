import game from '../game-client'

// register event handlers
game.registerEventListener('connect', (event)=>{
    console.log(event);
    // what to do when we are connected

    // update the store with connected status
});

export default {
    connect(username, password) {
        game.connect(username,  password);
    },
    sendPrivateMessage(msg) {
        console.log(msg);
    }
}