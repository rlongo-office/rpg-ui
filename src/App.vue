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
  import AppNavigation from "./components/AppNavigation.vue"
  import LoginView from "./views/login.vue"

  export default {
    name: 'App',
    data(){
      return {
      };
    },
    watch: {
    isConnected: function (status) {
      if(status){
                if (status){
          let type = "character";
          let body =  "character load";
          let dest = [this.userName];
          let msg = {id:0, type: type, data:body, dest:dest};
          console.log("Loading character from App.vue:");
          this.$store.dispatch('sendMessage',msg);
        }
      }
    }
  },
    computed: {
      isConnected() {
        return this.$store.state.isConnected;
      }
    },
    components: {AppNavigation, LoginView},
    created() {
    }
  }
</script>

<style>
@import './assets/styles/appstyle.css';
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
