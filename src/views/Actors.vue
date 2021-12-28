<template>
  <div>
    <div class="row">
      <div class="column">
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

export default {
  name: 'Actors',
  data() {
    return {
      creatures:[],
      creatureID:0,
      //actors:[],
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
          cell: [[-1, -1]]
        }
      },
        actorParams: {
        data: [
          ['appID','Name','source', 'HD', 'challenge']
        ],
        header: 'row',
        border:true,
        stripe: true,
        enableSearch: true,
        pagination: true,
        pageSize: 10,
        pageSizes: [5,10,15,25],
        sort: [0, 1, 2, 3],
      }
    }
  },
  computed: {
              actors(){
                return this.$store.state.actors
              }

  },
  mounted(){
      this.creatures = this.$store.state.creatures
      for (let x=0; x< this.creatures.length; x++){
            let creature = [x, this.creatures[x].name, this.creatures[x].hit_dice, this.creatures[x].challenge_rating]
            this.creatureParams.data.push(creature)
      }
      this.actors = this.$store.state.creatures
  },
  methods: {
    onCellChange (rowIndex, columnIndex, data) {
      console.log('onCellChange: ', rowIndex, columnIndex, data)

    },
    onCellClick (rowIndex, columnIndex, data) {
      console.log('onCellClick: ', rowIndex, columnIndex, data)
      //console.log('table data: ', this.$refs.table.getData())
      console.log(this.creatures[rowIndex-1])
      this.creatureID = rowIndex-1
      this.input.name = this.creatures[rowIndex-1].name
    },
    addActor(){
      // call the dispatch service to add Actors to the store object
      let testArray = JSON.stringify([{id:3,name:'bob'},{id:3,name:'john'}])
      let actor = JSON.parse(JSON.stringify(this.creatures[this.creatureID]))
      let lastID =  this.$store.state.actors.length - 1
      let newID = lastID + 1
      actor.name = this.input.name
      actor.appID = newID
      actor.source = this.creatures[this.creatureID].name
      let actorTableData = [ actor.appID,
                              actor.name,
                              actor.source,
                              actor.hit_dice, 
                              actor.challenge_rating
                            ]
      this.actorParams.data.push(actorTableData)
      this.$store.dispatch('setActor', actor)
      window.localStorage.setItem('test',testArray)
      console.log(window.localStorage.test)
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