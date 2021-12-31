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
                console.log(this.$store.state.storylines)
                console.log(newArray)
                //this.addStorylineData(newArray)
              }
  },
  mounted(){
            let dataArray = []
            this.storylineParams.data.push(this.storylineHeader)
            dataArray.push(this.storylineHeader)
            let limit = 30
            for (let x=0; x< this.storylines.length; x++){
                let description =  this.storylines[x].description.length > limit ?            //table has issue with strings longer than column length
                                   `${this.storylines[x].description.substr(0,limit)}...` :   //so trimming string off if beyond column width (the limit)
                                   this.storylines[x].description;
                let storyline = [
                                    this.storylines[x].name,
                                    description,
                                    this.storylines[x].type,
                                    "NS"
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
      console.log(dataArray)
      this.storylineParams.data = dataArray
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