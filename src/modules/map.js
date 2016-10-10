
const L = window.L
var map

class Marker {
  constructor (latLng, onClick, title) {
    const options = {}
    if (title !== undefined) {
      options.title = title
    }

    this.marker = L.marker(latLng, options).addTo(map)

    if (title !== undefined) {
      this.marker.bindPopup(title)
    }

    if (onClick) {
      this.onClick = onClick
      this.marker.on('click', onClick)
    }
  }

  destroy () {
    map.removeLayer(this.marker)
    if (this.onClick) {
      this.marker.off('click', this.onClick)
    }
  }

  setLatLng (latLng) {
    this.marker.setLatLng(latLng)
  }

  openPopup () {
    this.marker.openPopup()
  }

  closePopup () {
    this.marker.closePopup()
  }
}

export default {
  createMap (element) {
    map = L.map(element)
    window.map = map
    map.setView([0, 0], 0)

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)
  },

  addMarker (latLng, onClick, title) {
    return new Marker(latLng, onClick, title)
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
