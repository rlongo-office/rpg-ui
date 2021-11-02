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
              v-on:load="imageLoad" 
              ref="imgEl" 
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
    isDragging:false,
    divHeight:800,
    divWidth:800,
    topLimit:0,
    leftLimit:0,
    isLoaded: true,
    oldMouseX:0,
    oldMouseY:0
  }),
  computed: {

    },
  mounted() {
  },
methods: {
    
    imageLoad(){
      let image = this.$refs.imgEl
      console.log(image.clientWidth + "," + image.clientHeight)
      this.topLimit = -(image.clientHeight-this.divHeight)
      this.leftLimit = -(image.clientWidth-this.divWidth)
    },
    handleMouseDown(){
      //let imgEl = this.$refs.img
      //imgEl.style.left = 100;
      //imgEl.style.top = 100;
      if (this.imgTOP>this.topLimit){
         this.imgTOP +=  -5;
      }
      if (this.imgLEFT>this.leftLimit){
         this.imgLEFT +=  -5;
      }
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