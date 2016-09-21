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
    },
    title: {
      type: String
    },
    isSelected: {
      type: Boolean
    }
  },
  data: () => ({
    marker: undefined
  }),

  ready () {
    this.marker = map.addMarker(this.latLng, this.clickHandler, this.title)
  },

  beforeDestroy () {
    this.marker.destroy()
  },

  watch: {
    latLng () {
      this.marker.setLatLng(this.latLng)
    },
    isSelected () {
      if (this.isSelected) {
        this.marker.openPopup()
      } else {
        this.marker.closePopup()
      }
    }
  }
}
</script>