<template>
    <div>
        <select class="MultiSelect" @change="onChangeSelected($event)" multiple>
            <option v-bind:objectType="objectType" value="optionHeader" disabled>{{ objectType }}</option>
            <option v-for="option in options" :value="option.value" :key="option.id">{{ option.value }}</option>
        </select>
    </div>
</template>
<script>
export default {
  name: 'MultiSelect',
    props: {
        options: {
            type: Array,
        },
        objectType: {
            type: String,
        }
    },
  data(){
      return {
          selected:[]
      }
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
        this.$emit('changed', selectList)
      }
  }

} 
</script>

