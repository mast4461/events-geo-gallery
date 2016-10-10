<template>
  <div>
    <img class="thumbnail" :src="imgSrc" :alt="imageData.path" @click="fullScreen">
    <p>{{imageData.name}}</p>

    <fullscreen-image :show="isFullscreen" :img-src="imgSrc" :alt="imageData.path" :text="imageData.name"></fullscreen-image>
  </div>
</template>

<script>
import FullscreenImage from './FullscreenImage.vue'
const URL = window.URL || window.webkitURL

export default {
  props: ['imageData'],

  components: {
    FullscreenImage
  },

  data: () => ({
    imgSrc: '',
    isFullscreen: false
  }),

  methods: {
    updateImgSrc () {
      this.revokeImgSrc()

      this.imageData.getThumbnailBlob().then(blob => {
        this.imgSrc = URL.createObjectURL(blob)
      })
    },

    revokeImgSrc () {
      if (this.imgSrc) {
        URL.revokeObjectURL(this.imgSrc)
      }
    },

    fullScreen () {
      console.log('fullScreen')
      this.isFullscreen = !this.isFullscreen
    }
  },

  watch: {
    imageData () {
      this.updateImgSrc()
    }
  },

  ready () {
    this.updateImgSrc()
  },

  beforeDestroy () {
    this.revokeImgSrc()
  }
}
</script>

<style>
.thumbnail, .fullscreen {
  max-width: 100%;
  max-height: 100%;
  cursor: pointer;
}

</style>