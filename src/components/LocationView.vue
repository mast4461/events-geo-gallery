<template>
  <div>
    <h2>{{locationData.name}}</h2>
    <p v-if="locationData && !locationData.latLng">Coordinates missing</p>

    <template v-for="category in categories">
      <input type="checkbox" :id="category.name" :value="category" v-model="checkedCategories" checked>
      <label :for="category.name">{{category.name}}</label>
    </template>

    <div id="categories">
      <category-view v-for="category in categories" :category-data="category" v-show="checkedCategories.includes(category)"></category-view>
      <div v-if="categories.length === 0">No image categories for this location</div>
    </div>
  </div>
</template>

<script>
import CategoryView from './CategoryView.vue'
// import map from '../modules/map'

export default {
  props: ['locationData'],
  components: {
    CategoryView
  },

  data: () => ({
    // categories: [],
    checkedCategories: [],
    latLng: undefined
  }),

  computed: {
    categories () {
      return this.locationData ? this.locationData.categories : []
    }
  },

  watch: {
    categories () {
      this.checkedCategories = [...this.categories]
    }
  }
}
</script>

<style>
#categories {
  display: flex;
  justify-content: space-around;
}
</style>