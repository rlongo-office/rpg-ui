<template>
  <div>
      <h1>MAP PAGE</h1>
      <div class="portrait">
        <div
          v-on:mousedown="handleMouseDown"
          v-on:mousemove="handleMouseMove"
          v-on:mouseup="handleMouseUp"
          v-on:mouseleave="handleMouseLeave"
          v-on:touchstart="handleMouseDown"
          v-on:touchmove="handleMouseMove"
          v-on:touchend="handleMouseUp"
          class="wrapper">
            <img 
              ref="img" 
              :style="{ objectPosition: imgLEFT+ 'px ' + imgTOP + 'px' }"
              :src = "img">
        </div>
      </div>
  </div>
</template>

<script>
     import mapImage from "c:/development/maps/testwebmap.jpg"
export default {
  name: 'Map',
  data:()=>({
    img: mapImage,
    imgTOP: 0,
    imgLEFT: 0,
    isDragging:false
  }),
  computed: {
 
      images () {
        const img = this.$store.state.images
        return img
      },
      loadedImage(){
        if (this.images){
          return this.img;
        } else {
          return ""
        }
      }
    },
  mounted(){
  },
  watch: {
    images(){
        //this.img = this.images[0]
        console.log("Images has loaded")
        //this.ctx = this.canvas.getContext("2d");
        //this.ctx.drawImage(this.images[0] ,0,0);
    }
  },
  methods: {

    handleMouseDown(){
      //let imgEl = this.$refs.img
      //imgEl.style.left = 100;
      //imgEl.style.top = 100;
      this.imgTOP +=  -5;
      this.imgLEFT += -5;
    },
    handleMouseMove(){

    },
    handleMouseUp(){

    },
    handleMouseLeave(){

    }

  }
}
</script>
<style scoped>
.portrait{
  height: 100%;
  width: 100%;
  position: relative;
}

.wrapper{
    overflow:hidden;
    height: 800px;
    width: 800px;
    position: relative;
}

.wrapper img{
    position: relative;
}
</style>