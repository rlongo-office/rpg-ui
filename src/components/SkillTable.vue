<template>
  <div class="SkillTable">
      <table id="SkillTable">
        <tr>
          <th>Column 1</th>
          <th>Column 2</th>
        </tr>
        <tr v-for="skill in skills" :key="skill.name">
          <td>{{skill.name}}</td>
          <td>{{skill.value}}</td>
        </tr>
      </table>
  </div>
</template>

<script>
 export default {
  data (){
      return {
        skills:[
        {name: "Acrobatics",value: 4},
        {name: "Perception",value: 2},
        {name: "Language:Orcish",value: 5}         
        ]
      }
  }
  //computed: {
  //    skills(){
  //      return this.$store.state.skills
  //    }
 //}
 }

</script>