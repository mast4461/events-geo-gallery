
const L = window.L
var map

export default {
  createMap (element) {
    map = L.map(element)
    window.map = map
    map.setView([0, 0], 0)

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)
  },

  addMarker (latLng, onClick) {
    const marker = L.marker(latLng).addTo(map)

    if (onClick) {
      marker.on('click', onClick)
    }

    return {
      destroy () {
        map.removeLayer(marker)
        if (onClick) {
          marker.off('click', onClick)
        }
      },
      setLatLng (latLng) {
        marker.setLatLng(latLng)
      }
    }
  },

  setView (latLng, zoom) {
    map.setView(latLng, zoom)
  },

  fitLatLngs (latLngs) {
    map.fitBounds(L.latLngBounds(latLngs), {
      padding: [30, 30]
    })
  }
}
