<template>
    <div>
        <select @change="onChangeSelected($event)" multiple>
            <option value="optionHeader" disabled>Select {{objectType}}</option>
            <option v-for="option in options" :value="option.value" :key="option.id">{{ option.option }}</option>
        </select>
    </div>
</template>
<script>
export default {
  name: 'MultiSelect',
    props: {
        options: {
            type: Array
        },
        objectType:{
            type:String
        }
    },
  data(){
      return {
          selectOptions:[],  
          selected:[]
      }
  },
  mounted() {
    
    this.selectOptions = [{id:0,value:"Bob"},{id:1,value:"Ralph"},{id:2,value:"Frank"},{id:3,value:"Frannie"}]
    console.log(this.selectedOptions)
  },
  methods: {
      onChangeSelected(event){
        let selectList = []
        event.srcElement.forEach(option => {
            if (option.selected){
                selectList.push(option.text)
            }
        });
        this.selected = selectList
        console.log(this.selected)
      }
  }

} 
</script>

