<template>
  <div>
    <vue-table-dynamic
        id = "creatures"
        :params="creatureParams"
        @cell-change="onCellChange"
        @cell-click="onCellClick"
        ref="table"
    >
    </vue-table-dynamic>
    <table class="inputs">
        <tr></tr>
        <tr>
        <td><b>ID:</b><label id="creatureId">{{ creatureID }}</label></td>
        <td><b>Name:</b></td><td class="bigInput">
            <input type="text" class="form-control" name="inputName" v-model="input.name" />
        </td>
        </tr>
        <tr>
        <button @click="addActor">Add Actor</button>
        </tr>
    </table>
  </div>
</template>
<script>
import VueTableDynamic from 'vue-table-dynamic'
export default {
  name: 'CreatureTable',
  data() {
    return {
      creatures:[],
      creatureID:0,
      input: {
        name: "Creature"
      },
      creatureParams: {
        data: [
          ['id','Name', 'HD', 'challenge']
        ],
        header: 'row',
        border:true,
        stripe: true,
        enableSearch: true,
        pagination: true,
        pageSize: 10,
        pageSizes: [5,10,15,25],
        sort: [0, 1, 2, 3],
        edit: {
          row: [1],
          column: [1],
          cell: [[-1, -1]],
        },
        columnWidth: [
                        {column: 0, width: '10%'},
                        {column: 1, width: '50%'},
                        {column: 2, width: '20%'},
                        {column: 3, width: '20%'}
                        ]
      }
    }
  },
  mounted(){
      this.creatures = this.$store.state.creatures
      for (let x=0; x< this.creatures.length; x++){
            let creature = [x, this.creatures[x].name, this.creatures[x].hit_dice, this.creatures[x].challenge_rating]
            this.creatureParams.data.push(creature)
      }
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

    onCellChange (rowIndex, columnIndex, data) {
      console.log('onCellChange: ', rowIndex, columnIndex, data)

    },
    onCellClick (rowIndex, columnIndex, data) {
      console.log('onCellClick: ', rowIndex, columnIndex, data)
      //console.log('table data: ', this.$refs.table.getData())
      this.creatureID = rowIndex-1
      this.input.name = this.creatures[rowIndex-1].name
    },
    addActor(){
      // call the dispatch service to add Actors to the store object
      let actor = JSON.parse(JSON.stringify(this.creatures[this.creatureID]))
      let lastID =  this.$store.state.actors.length - 1
      let newID = lastID + 1
      actor.name = this.input.name
      actor.actID = newID
      actor.source = this.creatures[this.creatureID].name
      this.$store.dispatch('setActor', actor)
    }
  },
  components: { VueTableDynamic }
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