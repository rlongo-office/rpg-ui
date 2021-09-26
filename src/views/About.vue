<!--
<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
-->

<template>
  <div class="about">
    <div style="width: 600px">
      <vue-table-dynamic 
        :params="params"
        @select="onSelect" 
        @selection-change="onSelectionChange"
        @cell-change="onCellChange"
        ref="table"
      >
      </vue-table-dynamic>
    </div>
  </div>
</template>

<script>
import VueTableDynamic from 'vue-table-dynamic'

const random = () => {
  return parseInt(Date.now() + Math.random() * 10000000).toString(16).slice(-6)
}

export default {
  name: 'Demo',
  data() {
    return {
      params: {
        data: [
          ['Index', `Data1`, `Data2`, `Data3`]
        ],
        header: 'row',
        border: true,
        stripe: true,
        pagination: true,
        pageSize: 5,
        pageSizes: [5, 10, 20, 50],
        showCheck: true,
        enableSearch: true,
        sort: [0, 1,2,3],
        edit: {
          row: [],
          column: [1],
          cell: [[-1, -1]],
          getData:function() {console.log("The getData function was called")}
        }
      }
    }
  },
  mounted () {
    for (let i = 0; i < 100; i++) {
      this.params.data.push([i+1, `${random()}`, `${random()}`, `${random()}`])
    }
  },
    methods: {
    onSelect (isChecked, index, data) {
      console.log('onSelect: ', isChecked, index, data)
      console.log('Checked Data:', this.$refs.table.getCheckedRowDatas(true))
    },
    onSelectionChange (checkedDatas, checkedIndexs, checkedNum) {
      console.log('onSelectionChange: ', checkedDatas, checkedIndexs, checkedNum)
    },
    onCellChange (rowIndex, columnIndex, data) {
      console.log('onCellChange: ', rowIndex, columnIndex, data)
      console.log('table data: ', this.$refs.table.getData())
    }
  },
  components: { VueTableDynamic }
}
</script>