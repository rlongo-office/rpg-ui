<template>
  <div>
    <div>
      <table>
        <tr>
          <label for="connect">WebSocket connection:</label>
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
          <div >
            <form >
              <div >
                <v-btn
                  id="connect"
                  type="submit"
                  :disabled="connected == true"
                  @click.prevent="connect"
                >Connect</v-btn>
                <v-btn
                  id="disconnect"
                  type="submit"
                  :disabled="connected == false"
                  @click.prevent="disconnect"
                >Disconnect
                </v-btn>
              </div>
            </form>
          </div>
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
import SockJS from "sockjs-client";
import WebStompClient from 'webstomp-client';

export default {
  name: "chat2",
  data() {
    return {
      received_messages: [],
      allMessages: [{"id":0,"type":"G","body":"Initial Message"}],
      msgCount: 0,
      send_message: null,
      connected: false,
      isPrivate: false,
      userName: "",
    };
  },
  methods: {
    send() {
      console.log("Send message:" + this.send_message);
      if (this.stompClient && this.stompClient.connected) {
        const msg = { name: this.send_message };
        const stringMsg = this.send_message;
        console.log("Public: " + JSON.stringify(msg));
        this.stompClient.send("/app/chat", stringMsg, {});
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
    connect: function() {
              this.socket = new SockJS("http://localhost:8090/game-app");
              this.stompClient = WebStompClient.over(this.socket);
              this.connected = true;
              this.stompClient.connect(
                { username: this.userName,},
                frame =>{
                    console.log(frame);
                    this.stompClient.subscribe('/topic/chat', (message)=> {
                      console.log("You have recieved a chat message:" + message);
                      this.msgCount += 1;
                      const chatMessage = JSON.stringify(message.body);
                      const newMessage = {"id":this.msgCount,"type":"G","body":chatMessage}
                      this.allMessages.push(newMessage);
                   });
                    this.stompClient.subscribe('/user/queue/message', (message)=> {
                      this.msgCount += 1;
                      const chatMessage = JSON.stringify(message.body);
                      const newMessage = {"id":this.msgCount,"type":"P","body":chatMessage}
                      //this.received_messages.push(newMessage);
                      this.allMessages.push(newMessage);
                    });
                },
                error => {
                  console.log(error);
                  this.connected = false;
                }
              );        
            },
    disconnect() {
      if (this.stompClient) {
        this.stompClient.disconnect();
      }
      this.connected = false;
    },
    tickleConnection() {
      this.connected ? this.disconnect() : this.connect();
    },
    classSelector() {

    }
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