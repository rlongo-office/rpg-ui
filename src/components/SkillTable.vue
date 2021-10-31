<template>
  <div class="SkillTable">
      <table id="SkillTable" class="sectionHeader">
        <tr class="sectionHeader">
          <th>Name</th>
          <th>Pass</th>
          <th>Base</th>
          <th>Adj</th>
        </tr>
        <tr v-for="(val, index) in character.skills" :key="index">
          <td>{{val.name}}</td>
          <td>{{val.passive}}</td>
          <td>{{val.stat.raw}}</td>
          <td>
            <button 
              class="mybtn stat"
              v-on:click="rollSkillDice"
              :data-value="[val.name, val.stat.adj]"
            >{{val.stat.adj}}</button>
          </td>
        </tr>
      </table>
  </div>
</template>

<script>
 export default {
  data (){
      return {
      }
  },
  computed: {
      character () {
        return this.$store.state.character
      }
  },
  methods: {
    rollSkillDice(event) {
      let btnValue = event.target.dataset.value.split(',');
      let msgBody = "Roll Action: " + btnValue[0] + ":" + btnValue[1]
      //sending a die roll message
      console.log(msgBody)
    }
  }
 }
</script>
<style scoped>
  td,th {
    border-style: solid;
    border-color: darkgray;
    padding: 0 3px;
    font-size: 20px;
  }
</style>