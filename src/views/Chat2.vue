<template>
  <div>
    <div>
      <table>
        <tr>
          <label for="connect">Chat Client</label>
        </tr>
        <tr>
          <input
            type="text"
            id="name"
            v-model="userName"
            placeholder="Type in your User Name"
          >
        </tr>
        <tr>
          <label for="name" >Add your message</label>
        </tr>
        <tr>
          <div >
            <form >
              <div >
                <input
                  type="text"
                  id="messageText"
                  class="textInput"
                  v-model="send_message"
                  placeholder="Your msg here..."
                >
              </div>
              <v-btn
                id="send"
                type="submit"
                @click.prevent="send"
              >Public</v-btn>
              <v-btn
                id="sendPrivate"
                type="submit"
                @click.prevent="sendPrivate"
              >Private</v-btn>
              <input type="radio" id="chat" value="chat" v-model="picked">
              <label for="chat"> Chat </label>
              <input type="radio" id="roll" value="roll" v-model="picked">
              <label for="roll"> Roll </label>
              <input type="radio" id="character" value="character" v-model="picked">
              <label for="character"> Character </label>
              <br>
              <span>Picked: {{ picked }}</span>
            </form>
          </div>
        </tr>
        <tr>
          <div class ="chatBox">
            <div class="message"
              v-for="msg in allMessages" :key="msg.id"
              :class="{ 'private': msg.type === 'P',  }"
            >
              {{msg.body}}
            </div>
          </div>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>

export default {
  name: "chat2",
  data() {
    return {
      received_messages: [],
      picked:"",
      allMessages: [{"id":0,"type":"G","body":"Initial Message"}],
      msgCount: 0,
      send_message: null,
      connected: false,
      isPrivate: false,
      userName: "",
    };
  },
  computed: {
    messages() {
      return this.$store.state.messages;
    },
    isConnected(){
      return this.$store.state.isConnected;
    }
  },

  methods: {
    send: function() {
      //compose messaged based on component values
      if (this.isConnected) {
        let type = "party";
        let body =  this.send_message;
        let msgObj = {type: type, body:body, dest:null};
        let msg = JSON.stringify(msgObj);
        this.$store.dispatch('sendMessage',{msg:msg});
        console.log("Sending party message:" + msg);
      }
    },
    sendPrivate() {
      console.log("Send message:" + this.send_message);
      if (this.stompClient && this.stompClient.connected) {
        const msg = { name: this.send_message };
        const stringMsg = this.send_message;
        console.log("Private: " + JSON.stringify(msg));
        this.stompClient.send("/app/messages", stringMsg, {});
      }
    },
  },
  mounted() {
    // this.connect();
  }
};
</script>

<style scoped>
  div.chatBox {
      padding: 3px;
      border-style: solid;
      width: 360px;
      height: 500px;
      overflow-x: hidden;
      overflow-y: auto;
  }
  .message {
    text-align: left;
    font-size: 12px;
    font-family: Arial, Helvetica, sans-serif;
    color: blue;
  }
  input.textInput {
      padding: 6px 0px 6px 0px; 
      font-size: 12px;
      border-style: solid;
      width: 360px;
      height: 30px;
      overflow-y: scroll;
  }
  .private{
    color: purple;
  }
  .group{
    color: blue;
  }
  .alert{
    color: red;
  }
  .description{
    color: black;
  }

</style>