import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import character from "../data/character.json"
import gameService from "../services/game-service";
console.log(character.skills)

export default new Vuex.Store({
  state: {
    connected: false,
    allMessages: [],
    totalSkills: 10,
    skills:[
            {name: "Acrobatics",value: 4},
            {name: "Perception",value: 2},
            {name: "Language:Orcish",value: 5}         
           ],
    character: character
  },
  mutations: {
    setConnected(state, isConnected) {
      state.connected = isConnected;
    }
  },
  actions: {
    connect() {
      gameService.connect();
    }
  },
  modules: {},
});
