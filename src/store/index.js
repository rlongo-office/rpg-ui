import Vue from "vue";
// eslint-disable-next-line no-unused-vars
import Vuex, { Store } from "vuex";

Vue.config.devtools = true;
Vue.use(Vuex)

//import gameService from "../services/game-service";
import messageService from "../services/message-service"
import creatures from "../data/collections/creatures.json"
import items from "../data/collections/items.json"
import spells from "../data/collections/spells.json"
import storylines from "../data/collections/storylines.json"

export default new Vuex.Store({
  state: {
    isConnected: false,
    chatMessages: [{id:0,type:"info",data:"Beginning of Messages"}],
    character: {name:"",race:{},dieties:[]},
    images:[],
    creatures:creatures,
    items:items,
    spells: spells,
    actors:[],
    storylines: storylines,
    zones:[],
    encounters:[]
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
    },
    SET_IMAGE(state, msg) {
      //var image = new Image();
      console.log(msg.type)
      let strSource = "data:image/jpeg;base64," + msg.data
      state.images = [...state.images, strSource];
    },
    SET_ACTOR(state, newActor){
      let actor = newActor
      state.actors.push(actor)
      window.localStorage.setItem('actors',state.actors)
    },
    SET_ENCOUNTER(state, newEncounter){
      let encounter = newEncounter
      state.encounters.push(encounter)
      window.localStorage.setItem('encounters',state.encounters)
    },
    SET_STORYLINE(state, newStoryline){
      let storyline = newStoryline
      state.storylines.push(storyline)
      window.localStorage.setItem('storylines',state.storylines)
    },

    setZones(state, arrZone){
      state.zones = arrZone
    },
    setActors(state, arrActors){
      state.actors = arrActors
    },
    setStorylines(state, arrStorylines){
      state.storylines = arrStorylines
    },    
    setItems(state, arrItems){
      state.items = arrItems
    },    
    setCreatures(state, arrCreatures){
      state.creatures = arrCreatures
      console.log(state.creatures)
    },    
  },
  actions: {
    async connect(context, {username, password}) {
        // Do something here... lets say, a http call using vue-resource
          try {
            await messageService.connect(username, password)
            console.log ("connection successful")
            //let msg = {id:0, type: "character", data:"character", dest:[username]};
            //await context.dispatch('getCreatures')
            //let msg = {id:0, type: "image", data:"image", dest:[username]};
            //await context.dispatch('sendMessage',msg)
            // do the rest here
            //load storylines
            //load NPCs
            //items
          } catch {
            // handle error
          }
    },
    async getTheData(){
      messageService.getAPIData();
    },
    getCreatures(context){
      console.log("Vue Store-action: getCreatures")
      let creatures = messageService.getCreatures()
      context.commit('setCreatures',creatures)
    },
    getItems(context){
      let items = null
      context.commit('setItems',items)
    },
    getStorylines(context){
      let storylines = null
      context.commit('setStorylines',storylines)
    },
    getZones(context){
      let zones = null
      context.commit('setZones',zones)
    },
    getActors(context){
      let actors = null
      context.commit('setActors',actors)
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
    },
    loadImage(context, msg) {
      context.commit('SET_IMAGE', msg);
    },
    setActor(context,actor){
      context.commit('SET_ACTOR',actor)
    },
    setEncounter(context,encounter){
      context.commit('SET_ENCOUNTER',encounter)
    },
    setStoryline(context,storyline){
      context.commit('SET_STORYLINE',storyline)
    }

  },
  modules: {},
});
