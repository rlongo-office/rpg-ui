<template>
  <div>
    <vue-table-dynamic
        id = "storylines"
        :params="storylineParams"
        ref="storylineTable"
    >
    </vue-table-dynamic>
    <div>
      <button @click="addStoryline">Add Storyline</button>
    </div>
  </div>
</template>

<script>
import VueTableDynamic from 'vue-table-dynamic'

export default {
  name: 'StorylineTable',
  data() {
    return {
      storylineHeader: ['Name','description','Parents', 'Type', 'status'],
      strLimit:30,
        storylineParams: {
        data: [
                ],
        header: 'row',
        border:true,
        stripe: true,
        enableSearch: true,
        pagination: true,
        pageSize: 10,
        pageSizes: [5,10,15,25],
        sort: [0, 1, 2, 3, 4],
        columnWidth: [
                        {column: 0, width: '20%'},
                        {column: 1, width: '35%'},
                        {column: 2, width: '25%'},
                        {column: 3, width: '10%'},
                        {column: 4, width: '10%'}
                    ]
      }
    }
  },
  computed: {
              storylines:
              {
                    get()
                    {
                      return this.$store.state.storylines
                    },
                    set(storylines)
                    {
                      return storylines
                    }
              }
  },
  watch: {
              storylines(newArray) {
                this.addStorylineData(newArray)
              }
  },
  mounted(){
            let dataArray = []
            this.storylineParams.data.push(this.storylineHeader)
            dataArray.push(this.storylineHeader)
            for (let x=0; x< this.storylines.length; x++){
                let description =  this.storylines[x].description.length > this.strLimit ?            //table has issue with strings longer than column length
                                   `${this.storylines[x].description.substr(0,this.strLimit)}...` :   //so trimming string off if beyond column width (the limit)
                                   this.storylines[x].description;
                let storyline = [
                                    this.storylines[x].name,
                                    description,
                                    this.storylines[x].type,
                                    this.storylines[x].status,
                                ]
                if (this.storylines[x].parentLines.length > 0){  //if this storyline has links to parent storylines
                    let parentStories = ""
                    let end = this.storylines[x].parentLines.length - 1
                    for (let y=0; y<this.storylines[x].parentLines.length; y++){
                        parentStories += this.storylines[x].parentLines[y]
                        if (y != end){parentStories += ","}  //only require commas for non-ending list items
                    }
                    storyline.splice(2,0,parentStories)
                } else { 
                          storyline.splice(2,0,"") 
                        }

                dataArray.push(storyline)
      }
      this.storylineParams.data = dataArray
  },
  methods: {
    addStorylineData(storylines){
            let dataArray = []
            dataArray.push(this.storylineHeader)
            for (let x=0; x< storylines.length; x++){
              let description =  storylines[x].description.length > this.strLimit ?            //table has issue with strings longer than column length
                                `${storylines[x].description.substr(0,this.strLimit)}...` :   //so trimming string off if beyond column width (the limit)
                                   storylines[x].description;
                let storyline = [
                                    storylines[x].name, 
                                    description,
                                    storylines[x].type,
                                    storylines[x].status,
                                ]
                if (this.storylines[x].parentLines.length > 0){  //if this storyline has links to parent storylines
                    let parentStories = ""
                    let end = this.storylines[x].parentLines.length - 1
                    for (let y=0; y<this.storylines[x].parentLines.length; y++){
                        parentStories += this.storylines[x].parentLines[y]
                        if (y != end){parentStories += ","}  //only require commas for non-ending list items
                    }
                    storyline.splice(2,0,parentStories)
                } else { 
                          storyline.splice(2,0,"") 
                        }
                dataArray.push(storyline)
      }
      this.storylineParams.data = dataArray
    },
    addStoryline(){
      let newStory = JSON.parse(JSON.stringify(this.storylines[1]))
      newStory.name = "Reaming the Cube"
      newStory.parentLines = []
      newStory.conditions = []
      this.$store.dispatch('setStoryline', newStory)
    }
  },
  components: { VueTableDynamic }
}
</script>
<style>
</style>