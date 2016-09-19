<template>
  <div class="category-view">
    <h3>{{categoryData.name}}</h3>
    <thumbnail v-for="image in images" :image-data="image"></thumbnail>
  </div>
</template>

<script>
import Thumbnail from './Thumbnail'
export default {
  props: ['categoryData'],
  components: {
    Thumbnail
  },

  computed: {
    images () {
      return this.categoryData ? this.categoryData.images : []
    }
  }
}
</script>

<style>
.category-view {
  border: 1px solid black;
  flex: 1;
  text-align: center;
  position: relative;
}
</style>