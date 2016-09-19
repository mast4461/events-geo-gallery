<script>
import map from '../libs/map'

export default {
  props: {
    latLng: {
      type: Array,
      required: true
    },
    clickHandler: {
      type: Function
    }
  },
  data: () => ({
    marker: undefined
  }),

  ready () {
    this.marker = map.addMarker(this.latLng, this.clickHandler)
  },

  beforeDestroy () {
    this.marker.destroy()
  },

  watch: {
    latLng () {
      this.marker.setLatLng(this.latLng)
    }
  }
}
</script>