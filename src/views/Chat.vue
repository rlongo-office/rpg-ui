<template>
  <div>
    <h1>Character Sheet</h1>
      <CharacterHeader></CharacterHeader>
  </div>
</template>
<script>
  import CharacterHeader from "../components/CharacterHeader.vue"

export default {
  name: 'chat',
  components: {'CharacterHeader':CharacterHeader,
              },
  methods: {

  },
    computed: {
    isConnected(){
      return this.$store.state.isConnected
    },
  },
    async created() {
      /*
            let type = "character";
            let data  =  "character load";
            let dest = ["Bob"];
            let msg = {id:0, type: type, data:data, dest:dest};
            console.log("Loading character from character view");
            this.$store.dispatch('sendMessage',msg);
        */
    },
}
</script>
