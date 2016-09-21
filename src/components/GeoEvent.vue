<template>
  <div>
    <h2>{{eventMetaData.name}}</h2>
    <select name="location-selector" id="location-selector" v-model="selectedLocation">
      <option v-for="location in locations" :value="location">{{location.name}}</option>
    </select>
    <label for="location-selector">Select a location</label>

    <location-view v-if="selectedLocation" :location-data="selectedLocation"></location-view>

    <map-marker v-for="location in locationsWithCoordinates" :lat-lng="location.latLng" :click-handler="getLocationSelector(location)" :title="location.name" :is-selected="location === selectedLocation"></map-marker>
  </div>
</template>

<script>
import LocationView from './LocationView.vue'
import MapMarker from './MapMarker.vue'
import map from '../libs/map'

export default {
  props: ['eventMetaData'],
  components: {
    LocationView,
    MapMarker
  },

  data: () => ({
    selectedLocation: undefined,
    eventData: undefined
  }),

  computed: {
    string () {
      return JSON.stringify(this.eventData, null, 2)
    },

    locations () {
      if (this.eventData) {
        return this.eventData.locations
      } else {
        return []
      }
    },

    latLngs () {
      return this.locationsWithCoordinates.map(location => location.latLng)
    },

    locationsWithCoordinates () {
      return this.locations.filter(location => location.latLng)
    }
  },

  methods: {
    fetchEventData () {
      this.eventMetaData.getEventData().then(eventData => {
        this.eventData = eventData
        console.log(JSON.stringify(this.eventData, null, 2))
        this.zoomToExtent()
      }).catch(err => console.log(err))
    },

    getLocationSelector (location) {
      return () => {
        this.selectedLocation = location
        this.viewSelectedLocation()
      }
    },

    zoomToExtent () {
      map.fitLatLngs(this.latLngs)
    },

    viewSelectedLocation () {
      const latLng = this.selectedLocation.latLng
      if (latLng) {
        map.setView(this.selectedLocation.latLng)
      } else {
        this.zoomToExtent()
      }
    }
  },

  watch: {
    eventMetaData () {
      this.fetchEventData()
    },

    selectedLocation () {
      this.viewSelectedLocation()
    }
  },

  ready () {
    this.fetchEventData()
  }

}
</script>