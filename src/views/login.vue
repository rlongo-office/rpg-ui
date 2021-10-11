<template>
    <v-form @submit.prevent="login">
        <v-container>
            <v-row>
                <v-col cols="12" md="4" class="minw-400 centered">
                    <v-text-field
                        label="User Name"
                        class="loginInput minw-200 centered"
                        v-model="username"
                        placeholder="username"/>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field
                        label="Password"
                        class="loginInput minw-200"
                        v-model="password"
                        placeholder="password"/>
                </v-col>
            </v-row>
            <v-row>
                <v-btn input type="submit" value="log in">Submit</v-btn>
            </v-row>
        </v-container>
    </v-form>
</template>
<script>
import gameService from "../services/game-service"

export default {
  name: "App",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    async login() {
      const { username, password } = this;  //object deconstruction - E6 edition to javascript
      //using websocket connection? Have view component call our Game Service instead
      if(await gameService.connect(username, password)) {
          // success
      } else {
          // failed
      }
    }
  }
};
</script>
<style scoped>
    .minw-200 {
        min-width: 200px;
    }
    .minw-400 {
        min-width: 200px;
    }
    .centered {
        text-align: center;
    }
</style>