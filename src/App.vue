<template>
  <div id="app">
    <!-- <img class="logo" src="./assets/logo.png"> -->
    <geo-events-view></geo-events-view>
  </div>
</template>

<script>
import GeoEventsView from './components/GeoEventsView'

export default {
  components: {
    GeoEventsView
  }
}
</script>

<style>
html {
  height: 100%;
}

body {
/*  display: flex;
  align-items: center;
  justify-content: center; */

  height: 100%;
}

#app {
  color: #2c3e50;
  /*max-width: 600px;*/
  font-family: Source Sans Pro, Helvetica, sans-serif;
}

#app a {
  color: #42b983;
  text-decoration: none;
}

.logo {
  width: 100px;
  height: 100px
}
</style>
