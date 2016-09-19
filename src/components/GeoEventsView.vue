<template>
  <div>
    <label for="token">Access token</label>
    <input type="password" name="token" v-model="accessToken">
    <br>

    <label for="event-selector">Event</label>
    <select name="event-selector" id="event-selector" v-model="selectedGeoEvent">
      <option v-for="geoEvent in geoEvents" :value="geoEvent">{{geoEvent.name}}</option>
    </select>

    <div id="map-container"></div>

    <geo-event v-if="selectedGeoEvent" :event-meta-data="selectedGeoEvent"></geo-event>
  </div>
</template>

<script>
import GeoEvent from './GeoEvent.vue'
import server from '../libs/server'
import map from '../libs/map'

export default {
  components: {
    GeoEvent
  },
  data: () => ({
    msg: 'hello',
    geoEvents: [],
    selectedGeoEvent: undefined,
    accessToken: server.getAccessToken()
  }),
  // data () {
  //   return {
  //     msg: 'hello'
  //   }
  // },
  ready () {
    map.createMap('map-container')
    this.fetchEvents()
  },

  watch: {
    accessToken () {
      server.setAccessToken(this.accessToken)
      this.fetchEvents()
    },

    geoEvents () {
      if (this.geoEvents.length === 1) {
        this.selectedGeoEvent = this.geoEvents[0]
      }
    }
  },

  methods: {
    fetchEvents () {
      server.getEvents().then(events => {
        this.$set('geoEvents', events)
      })
    }
  }
}
</script>

<style>
#map-container {
  height: 200px
}
</style>