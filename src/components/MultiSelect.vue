<template>
    <div>
        <select @change="onChangeSelected($event)" multiple>
            <option v-for="option in selectOptions" :value="option.id" :key="option.id">{{ option.option }}</option>
        </select>
    </div>
</template>
<script>
export default {
  name: 'Test',
  props: ['options'],
  data(){
      return {
          selectOptions:[],  
          selected:[]
      }
  },
  mounted() {
    this.selectOptions = [{id:0,option:"Bob"},{id:1,option:"Ralph"},{id:2,option:"Frank"},{id:3,option:"Frannie"}]
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

