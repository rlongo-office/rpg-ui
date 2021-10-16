import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import character from "../data/character.json"
import gameService from "../services/game-service";
console.log(character.skills)

export default new Vuex.Store({
  state: {
    isConnected: false,
    chatMessages: [{id:0,type:"info",body:"Beginning of Messages"}],
    character: {}
  },
  mutations: {
    setConnected(state, isConnected) {
      state.isConnected = isConnected;
    },
    addChatMessage(state, {msg}) {
      msg.id = state.chatMessages.length + 1;
      state.messages = [...state.chatMessages, msg];
    },
  },
  actions: {
    connect({username, password}) {
      gameService.connect(username, password);
    },
    setConnected(context, isConnected) {
      context.commit('setConnected', isConnected);
    },
    sendMessage(context,{msg}) {
      console.log("Store SendMessage called with message " + JSON.stringify(msg))
      gameService.sendMessage(msg);
    },
    addChatMessage(context, {msg}) {
      context.commit('addChatMessage', msg);
    }
  },
  modules: {},
});
