<template>
  <div>
    <div class="row">
      <div class="column">
            <creature-table>
            </creature-table>
      </div>
      <div class="column">
        <vue-table-dynamic
          id = "actors"
          :params="actorParams"
          ref="table2"
        >
        </vue-table-dynamic>
      </div>
    </div>
  </div>
</template>

<script>
import VueTableDynamic from 'vue-table-dynamic'
import CreatureTable from '../components/CreatureTable.vue'

export default {
  name: 'Actors',
  data() {
    return {
      actorHeader: ['actID','Name','source', 'HD', 'challenge'],
        actorParams: {
        data: [
                ],
        header: 'row',
        border:true,
        stripe: true,
        enableSearch: true,
        pagination: true,
        pageSize: 10,
        pageSizes: [5,10,15,25],
        sort: [0, 1, 2, 3],
        columnWidth: [
                      {column: 0, width: '10%'},
                      {column: 1, width: '30%'},
                      {column: 2, width: '30%'},
                      {column: 3, width: '15%'},
                      {column: 4, width: '15%'}
                    ]
      }
    }
  },
  computed: {
              actors:
              {
                    get()
                    {
                      return this.$store.state.actors
                    },
                    set(actors)
                    {
                      return actors
                    }
              }
  },
  watch: {
              actors(newArray) {
                this.addActorData(newArray)
              }
  },
  mounted(){
      this.actorParams.data.push(this.actorHeader)
  },
  methods: {
    addActorData(actors){
        let dataArray = []
        dataArray.push(this.actorHeader)
        for (let x=0; x< actors.length; x++){
            dataArray.push([ 
                          actors[x].actID,
                          actors[x].name,
                          actors[x].source,
                          actors[x].hit_dice, 
                          actors[x].challenge_rating
                        ])
        }
        this.actorParams.data = dataArray
    },
  },
  components: { VueTableDynamic,'creature-table':CreatureTable }
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