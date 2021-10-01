<template>
  <v-app>
    <template v-if="isConnected">
      <AppNavigation></AppNavigation>
      <v-container>
        <router-view />
      </v-container>
    </template>
    <template v-else>
      <login-view></login-view>
    </template>
  </v-app>
</template>
<script>
import AppNavigation from "./components/AppNavigation.vue";
import LoginView from "./views/login.vue"
import GameService from './game-service/game-service';

    export default {
        name: 'App',
        components: {AppNavigation, LoginView},
        computed:{
          isConnected: () => GameService.isConnected
        }
    }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
