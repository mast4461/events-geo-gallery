<template>
  <div>
    <img class="thumbnail" :src="imgSrc" :alt="imageData.path">
    <p>{{imageData.name}}</p>
  </div>
</template>

<script>
const URL = window.URL || window.webkitURL
export default {
  props: ['imageData'],

  data: () => ({
    imgSrc: ''
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
.thumbnail {
  max-width: 100%;
  max-height: 100%;
}
</style>