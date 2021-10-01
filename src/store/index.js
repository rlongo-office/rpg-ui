import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import character from "../data/character.json"

export default new Vuex.Store({
  state: {
    skills: character.skills,
  },
  mutations: {},
  actions: {},
  modules: {},
});
