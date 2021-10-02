import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import character from "../data/character.json"
console.log(character.skills)

export default new Vuex.Store({
  state: {
    totalSkills: 10,
    skills:[
            {name: "Acrobatics",value: 4},
            {name: "Perception",value: 2},
            {name: "Language:Orcish",value: 5}         
           ],
    character: character
  },
  mutations: {},
  actions: {},
  modules: {},
});
