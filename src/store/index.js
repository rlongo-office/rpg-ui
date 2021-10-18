import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import character from "../data/character.json"
//import gameService from "../services/game-service";
import messageService from "../services/message-service"
console.log(character.skills)

export default new Vuex.Store({
  state: {
    isConnected: false,
    chatMessages: [{id:0,type:"info",body:"Beginning of Messages"}],
    character: {},
    maps:[]
  },
  mutations: {
    setConnected(state, isConnected) {
      state.isConnected = isConnected;
    },
    ADD_CHAT_MESSAGE(state, msg) {
      msg.id = state.chatMessages.length + 1;
      state.chatMessages = [...state.chatMessages, msg];
    },
  },
  actions: {
    connect(context, {username, password}) {
      messageService.connect(username, password);
    },
    setConnected(context, isConnected) {
      context.commit('setConnected', isConnected);
    },
    sendMessage(context,msg) {
      console.log("Store SendMessage called with message " + JSON.stringify(msg))
      messageService.sendMessage(msg);
    },
    addChatMessage(context, msg) {
      console.log("Store Action addChatMessage called with: " + JSON.stringify(msg))
      context.commit('ADD_CHAT_MESSAGE', msg);
    }
  },
  modules: {},
});
