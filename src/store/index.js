import Vue from "vue";
// eslint-disable-next-line no-unused-vars
import Vuex, { Store } from "vuex";

Vue.config.devtools = true;
Vue.use(Vuex);
import character from "../data/character.json"
//import gameService from "../services/game-service";
import messageService from "../services/message-service"
console.log(character.skills)

export default new Vuex.Store({
  state: {
    isConnected: false,
    chatMessages: [{id:0,type:"info",data:"Beginning of Messages"}],
    character: {name:"",race:{},dieties:[]},
    images:[]
  },
  mutations: {
    setConnected(state, isConnected) {
      state.isConnected = isConnected;
    },
    ADD_CHAT_MESSAGE(state, msg) {
      msg.id = state.chatMessages.length + 1;
      state.chatMessages = [...state.chatMessages, msg];
    },
    SET_CHARACTER(state, msg) {
      state.character = JSON.parse(msg.data);
      console.log("Character data has been set as " + JSON.stringify(state.character));
    }
  },
  actions: {
    connect(context, {username, password}) {
      messageService.connect(username, password);
    },
    setConnected(context, isConnected) {
      context.commit('setConnected', isConnected);
    },
    sendMessage(context,msg) {
      messageService.sendMessage(msg);
    },
    addChatMessage(context, msg) {
      context.commit('ADD_CHAT_MESSAGE', msg);
    },
    loadCharacter(context, msg) {
      context.commit('SET_CHARACTER', msg);
    }
  },
  modules: {},
});
