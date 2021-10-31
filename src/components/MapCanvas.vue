<template>
  <div>
      <h1>MAP PAGE</h1>
      <canvas id="canvas" width=800 height=800></canvas>
      <img :src = "images[0]">
  </div>
</template>

<script>
import imageMap from "c:/development/maps/testwebmap.jpg"
export default {
  name: 'Map',
  data (){
      return {
        img: imageMap
      }
  },
  computed: {
      images () {
        const img = this.$store.state.images
        return img
      }
    }
}
</script>