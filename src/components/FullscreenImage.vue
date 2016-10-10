<template>
  <dialog class="fullscreen">
    <img class="fullscreen" :src="imgSrc" :alt="alt" @click="close">
    <p>{{text}}</p>
  </dialog>
</template>

<script>
export default {
  props: ['imgSrc', 'alt', 'show', 'text'],

  methods: {
    updateDialogState () {
      if (this.show && !this.$el.open) {
        this.$el.show()
      } else if (!this.show && this.$el.open) {
        this.$el.close()
      }
    },

    close () {
      this.$el.close()
    }
  },

  watch: {
    show () {
      this.updateDialogState()
    }
  },

  ready () {
    document.body.appendChild(this.$el)
    this.updateDialogState()
  }
}
</script>

<style>
dialog.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  font-family: sans-serif;
}

img.fullscreen {
  max-width: 100%;
  margin: auto;
}

</style>