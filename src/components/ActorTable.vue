<template>
  <div>
    <vue-table-dynamic
        id = "actors"
        :params="actorParams"
        ref="actorTable"
    >
    </vue-table-dynamic>
  </div>
</template>

<script>
import VueTableDynamic from 'vue-table-dynamic'

export default {
  name: 'ActorTable',
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
  components: { VueTableDynamic }
}
</script>
<style>
</style>