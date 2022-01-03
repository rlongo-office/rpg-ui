<template>
  <div>
            <story-line>
            </story-line>
    <div>
            <multi-selected 
              :options="options" 
              :objectType="objectType"
              v-on:changed="processResults"
            />
    </div>
  </div>
</template>

<script>
import StorylineTable from '../components/StorylineTable.vue'
import MultiSelected from '../components/MultiSelect.vue'

export default {
  name: 'Lore',
  data(){ 
    return {
      options: [{id:0,value:"Jim"},{id:1,value:"Ralph"},{id:2,value:"Frank"},{id:3,value:"Frannie"}],
      objectType: "Actors"
    }
  },
  methods:{
    processResults(resultList){
        console.log(resultList)
    }
  },
  components: {'story-line':StorylineTable,'multi-selected':MultiSelected }
}
</script>
<style>

</style>