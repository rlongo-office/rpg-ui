<template>
  <div>
            <story-line>
            </story-line>
    <div>
            <multi-selected>
            </multi-selected>
    </div>
  </div>
</template>

<script>
import StorylineTable from '../components/StorylineTable.vue'
import MultiSelected from '../components/MultiSelect.vue'

export default {
  name: 'Lore',
  
  components: {'story-line':StorylineTable,'multi-selected':MultiSelected }
}
</script>
<style>

</style>