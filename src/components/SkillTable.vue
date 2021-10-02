<template>
  <div class="SkillTable">
      <table id="SkillTable">
        <tr>
          <th>Column 1</th>
          <th>Column 2</th>
        </tr>
        <tr v-for="skilz in character.skills" :key="skilz.name">
          <td>{{skilz.name}}</td>
          <td>{{skilz.value}}</td>
          <td>
            <button class="mybtn stat">{{skilz.value}}</button>
          </td>
        </tr>
      </table>
  </div>
</template>

<script>
 export default {
  data (){
      return {
        /*skills:[
        {name: "Acrobatics",value: 4},
        {name: "Perception",value: 2},
        {name: "Language:Orcish",value: 5}         
        ]*/
      }
  },
  computed: {
      skills () {
        return this.$store.state.skills
      },
      character () {
        return this.$store.state.character.character
      }
  }
 }

</script>