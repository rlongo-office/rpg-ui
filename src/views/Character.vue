<template>
  <div>
    <v-expansion-panels>
        <v-expansion-panel>
            <v-expansion-panel-header>Item</v-expansion-panel-header>
            <v-expansion-panel-content>
                <CharacterHeader></CharacterHeader>
            </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
            <v-expansion-panel-header>Item</v-expansion-panel-header>
            <v-expansion-panel-content>
                <SkillTable></SkillTable>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
    <button v-on:click="toggleSection" class="collapsible sectionBtn" >Features</button>
        <div class="content">
            <CharacterHeader></CharacterHeader>
        </div>
    <button v-on:click="toggleSection" class="collapsible sectionBtn" >Skills</button>
        <div class="content">
            <SkillTable></SkillTable>
        </div>
  </div>
</template>
<script>
  import CharacterHeader from "../components/CharacterHeader.vue"
  import SkillTable from "../components/SkillTable.vue"

export default {
    name: 'character',
      data: () => ({
        panel: [0, 1],
        disabled: false,
        readonly: false,
    }),
    components: {'CharacterHeader':CharacterHeader,
                'SkillTable':SkillTable
    },
    methods: {
            toggleSection: function (event) {
                let element = event.target;
                element.classList.toggle("active");
                let  content = element.nextElementSibling;
                if (content.style.display === "block") {
                content.style.display = "none";
                } else {
                content.style.display = "block";
                }
            }
    },
    computed: {
                isConnected(){
                 return this.$store.state.isConnected
                }
    }

}
</script>
<style scoped>
details {
  user-select: none;
}

details>summary

summary {
  display: flex;
  cursor: pointer;
}

summary::-webkit-details-marker {
  display: none;
}
 .summaryHeader{
     background-color: maroon;
     color: white;
 } 

.collapsible {
  color: white;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
}

.active, .collapsible:hover {
  background-color: rgb(185, 31, 31);
}

.content {
  padding: 0 18px;
  display: none;
  overflow: hidden;
  background-color: #f1f1f1;
}
</style>