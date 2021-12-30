<template>
  <div>
    <div class="row">
      <div class="column">
            <creature-table>
            </creature-table>
      </div>
      <div class="column">
        <actor-table></actor-table>
      </div>
    </div>
  </div>
</template>

<script>
import CreatureTable from '../components/CreatureTable.vue'
import ActorTable from '../components/ActorTable.vue'

export default {
  name: 'Actors',
  
  components: {'creature-table':CreatureTable,'actor-table':ActorTable }
}
</script>
<style>

.bigInput{
   width: 80px;
}

/* Create two equal columns that floats next to each other */
.column {
  float: left;
  width: 50%;
  padding: 10px;
  height: 300px; /* Should be removed. Only for demonstration */
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}
</style>