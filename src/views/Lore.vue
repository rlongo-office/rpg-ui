<template>
  <div>
            <story-line>
            </story-line>
    <div>
            <multi-selected :options>
            </multi-selected>
    </div>
  </div>
</template>

<script>
import StorylineTable from '../components/StorylineTable.vue'
import MultiSelected from '../components/MultiSelect.vue'

export default {
  name: 'Lore',
  data(){
    options: [{id:0,value:"Bob"},{id:1,value:"Ralph"},{id:2,value:"Frank"},{id:3,value:"Frannie"}]
  },
  components: {'story-line':StorylineTable,'multi-selected':MultiSelected }
}
</script>
<style>

</style>