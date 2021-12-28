<template>
  <div>
      <h1>MAP PAGE</h1>
      <div class="portrait">
        <div
          @mousedown ="handleMouseDown"
          v-on:mousemove="handleMouseMove"
          v-on:mouseleave="handleMouseLeave"
          v-on:touchstart="handleMouseDown"
          v-on:touchmove="handleMouseMove"
          v-on:touchend="handleMouseUp"
          class="wrapper">
            <img
              id = "imgEl"
              v-on:load="imageLoad" 
              ref="imgEl" 
              :style="{ objectPosition: imgLEFT+ 'px ' + imgTOP + 'px' }"
              :src="imageBytes"         
              >
        </div>
      </div>
  </div>
</template>

<script>
//import newImage from "c:/development/maps/testwebmap.jpg"
export default {
  name: 'Map',
  data:()=>({
    img:"",
    imgTOP: 0,
    imgLEFT: 0,
    isFirstPress: true,
    isDragging:false,
    isScaling:false,
    divHeight:500,
    divWidth:500,
    topLimit:0,
    leftLimit:0,
    isLoaded: true,
    oldMouseX:0,
    oldMouseY:0
  }),
  computed: {
      imageBytes(){
        return this.$store.state.images[0]
      }
    },
methods: {
    imageLoad(){
      let image = this.$refs.imgEl
      this.topLimit = -(image.clientHeight-this.divHeight)
      this.leftLimit = -(image.clientWidth-this.divWidth)
    },
    dist(e) {
      let zw = e.touches[0].pageX - e.touches[1].pageX, zh = e.touches[0].pageY - e.touches[1].pageY;
      return Math.sqrt(zw * zw + zh * zh);
    },
    handleMouseDown(e){
          let canMouseX;
          let canMouseY;
          if ((e.clientX)&&(e.clientY)) {
            canMouseX = parseInt(e.clientX);
            canMouseY = parseInt(e.clientY);
            console.log("mouseDown: "+ canMouseX + "," + canMouseY)
            // set the drag flag
          this.isDragging=true;
          } else if (e.targetTouches) {
            e.preventDefault();
            canMouseX=parseInt(e.targetTouches[0].clientX);
            canMouseY=parseInt(e.targetTouches[0].clientY);
            if (e.touches.length > 1) {
              //detected a pinch
              this.isScaling = true;
            } else {
              // set the drag flag
              this.isDragging=true;
              this.isScaling = false;
            }
          }
          this.isFirstPress = false;
          this.oldMouseX = canMouseX;
          this.oldMouseY = canMouseY; 
    },
    async handleMouseMove(e){
        let canMouseX
        let canMouseY
        console.log("mouseMove: "+ this.oldMouseX + "," 
                                  + this.oldMouseY + "drag:" + this.isDragging)
        if ((e.clientX)&&(e.clientY)) {
          canMouseX = parseInt(e.clientX);
          canMouseY = parseInt(e.clientY);
        } else if (e.targetTouches) {
          canMouseX = parseInt(e.targetTouches[0].clientX)
          canMouseY = parseInt(e.targetTouches[0].clientY)
          e.preventDefault()
        }
        //if scaling flag is set, clear the canvas and draw the image at the correct scale
        if (this.isScaling){
          this.imgScale = parseInt(this.dist(e)/this.touchDist);
          if (this.imgScale < 1) this.imgScale=1;
        }
        // if the drag flag is set, clear the canvas and draw the image
        if(this.isDragging && !this.isFirstPress){
            let yDiff = canMouseY - this.oldMouseY;
            let xDiff = canMouseX - this.oldMouseX;
            //this.subImgX += this.xDiff;
            //this.subImgY += this.yDiff;
            if(this.imgLEFT + xDiff <= this.leftLimit ){
                xDiff = 0
            } else if(this.imgLEFT + xDiff >=0 ){
               xDiff = 0
            }
            if(this.imgTOP + yDiff <= this.topLimit ){
                yDiff = 0
            } else if(this.imgTOP + yDiff >=0 ){
               yDiff = 0
            }
            console.log("xDiff " + xDiff + "yDiff " + yDiff)
            this.imgTOP += yDiff
            this.imgLEFT += xDiff
            console.log("img Top:" + this.imgTOP + "img LEFT:" + this.imgLEFT)
        }
        this.oldMouseX = canMouseX;
        this.oldMouseY = canMouseY;
    },
    handleMouseUp(e){
        let canMouseX;
        let canMouseY;
        if ((e.clientX)&&(e.clientY)) {
          canMouseX=parseInt(e.clientX-this.offsetX);
          canMouseY=parseInt(e.clientY-this.offsetY);
          // set the drag flag
        } else if (e.targetTouches) {
            e.preventDefault();
            canMouseX=parseInt(e.targetTouches[0].clientX-this.offsetX);
            canMouseY=parseInt(e.targetTouches[0].clientY-this.offsetY);
          }
        // user has removed touch or released mouse button, so clear the drag flag
        this.isDragging = this.isScaling = false;
        this.oldMouseX = canMouseX;
        this.oldMouseY = canMouseY;
    },
    handleMouseLeave(){
        // user has left the canvas, so clear the drag flag
        this.isDragging = this.isScaling =false;
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
    height: 500px;
    width: 500px;
    position: relative;
}

.wrapper img{
    position: relative;
}
</style>