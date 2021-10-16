import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import character from "../data/character.json"
import gameService from "../services/game-service";
console.log(character.skills)

export default new Vuex.Store({
  state: {
    isConnected: false,
    messages: [],
    character: {}
  },
  mutations: {
    setConnected(state, isConnected) {
      state.isConnected = isConnected;
    },
    addMessage(state, msg) {
      state.messages = [...state.messages, msg];
    },
  },
  actions: {
    connect({username, password}) {
      gameService.connect(username, password);
    },
    setConnected(context, isConnected) {
      context.commit('setConnected', isConnected);
    },
    sendMessage(msg) {
      gameService.sendMessage(msg);
    },
    addMessage(context, msg) {
      context.commit('addMessage', msg);
    }
  },
  modules: {},
});
