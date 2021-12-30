<template>
  <div>
    <vue-table-dynamic
        id = "storylines"
        :params="storylineParams"
        ref="storylineTable"
    >
    </vue-table-dynamic>
  </div>
</template>

<script>
import VueTableDynamic from 'vue-table-dynamic'

export default {
  name: 'StorylineTable',
  data() {
    return {
      storylineHeader: ['Name','description','Parents', 'Type', 'status'],
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
        sort: [0, 1, 2, 3],
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
            this.storylineParams.data.push(this.storylineHeader)
            for (let x=0; x< this.storylines.length; x++){
                let storyline = [
                                    this.storylines[x].name, 
                                    this.storylines[x].description,
                                    this.storylines[x].type,
                                    "NS"
                                ]
                if (this.storylines[x].parentLines.length>0){  //if this storyline has links to parent storylines
                    let parentStories = ""
                    let end = this.storylines[x].parentLines.length - 1
                    for (let y=0; y<this.storylines[x].parentLines.length; y++){
                        parentStories += this.storylines[x].parentLines[y]
                        if (y != end){parentStories += ","}  //only require commas for non-ending list items
                    }
                    storyline.splice(2,0,parentStories)
                }
                this.storylineParams.data.push(storyline)
      }
      console.log("storyline table mounted with following data" + this.storylineParams.data)
  },
  methods: {
    addStorylineData(storylines){
            this.storylineParams.data.push(this.storylineHeader)
            for (let x=0; x< storylines.length; x++){
                let storyline = [
                                    storylines[x].name, 
                                    storylines[x].description,
                                    storylines[x].type,
                                    "NS"
                                ]
                if (storylines[x].parentLines.length>0){  //if this storyline has links to parent storylines
                    let parentStories = ""
                    let end = storylines[x].parentLines.length - 1
                    for (let y=0; y<storylines[x].parentLines.length; y++){
                        parentStories += storylines[x].parentLines[y]
                        if (y != end){parentStories += ","}  //only require commas for non-ending list items
                    }
                    storyline.splice(2,0,parentStories)
                }
                this.storylineParams.data.push(storyline)
      }
    },
  },
  components: { VueTableDynamic }
}
</script>
<style>
</style>