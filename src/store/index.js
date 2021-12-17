import Vue from "vue";
// eslint-disable-next-line no-unused-vars
import Vuex, { Store } from "vuex";

Vue.config.devtools = true;
Vue.use(Vuex);

//import gameService from "../services/game-service";
import messageService from "../services/message-service"

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
    },
    SET_IMAGE(state, msg) {
      //var image = new Image();
      console.log(msg.type)
      let strSource = "data:image/jpeg;base64," + msg.data
      state.images = [...state.images, strSource];
    }
  },
  actions: {
    async connect(context, {username, password}) {
        // Do something here... lets say, a http call using vue-resource
          try {
            await messageService.connect(username, password);
            let msg = {id:0, type: "character", data:"character", dest:[username]};
            await context.dispatch('sendMessage',msg);
            msg = {id:0, type: "image", data:"image", dest:[username]};
            await context.dispatch('sendMessage',msg)
            // do the rest here
          } catch {
            // handle error
          }
    },
    async getTheData(){
      messageService.getAPIData();
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
    }
  },
  modules: {},
});
