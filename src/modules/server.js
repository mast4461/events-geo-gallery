import Dropbox from 'dropbox'
import { getAccessToken } from './window-location-parser'

const dbx = new Dropbox()

function init () {
  console.log('initializing')
  return new Promise((resolve, reject) => {
    const token = getAccessToken()
    if (token === undefined) {
      console.log('Token not found in URL')
      reject('Token not found in URL')

      // Hmm, the following URL should probably be a configuration setting...
      window.location = 'https://www.dropbox.com/1/oauth2/authorize?client_id=iybymu5ptwg7vkc&response_type=token&redirect_uri=https://mast4461.github.io/events-geo-gallery/'
    } else {
      dbx.setAccessToken(token)
      resolve()
    }
  })
}

class Folder {
  constructor (dropboxResponseEntry) {
    this.name = dropboxResponseEntry.name
    this.path = dropboxResponseEntry.path_lower
  }

  getContents () {
    return filesListFolder({path: this.path})
  }

  getThumbnail () {
    return dbx.filesGetThumbnail({path: this.path})
      .catch(logAndRethrowError)
  }

  getEventData () {
    return dbx.filesListFolder({path: this.path, recursive: true})
      .then(raw => {
        console.log({raw})
        return raw
      })
      .then(sortEntries)
      .then(flatListToTree)
      .then(treeToEventData)
      .catch(logAndRethrowError)
  }
}

function sortEntries (dropboxResponse) {
  dropboxResponse.entries = dropboxResponse.entries.sort((a, b) => {
    var pathA = a.path_lower
    var pathB = b.path_lower
    if (pathA < pathB) {
      return -1
    } else if (pathA > pathB) {
      return 1
    } else {
      return 0
    }
  })

  return dropboxResponse
}

// From http://brandonclapp.com/arranging-an-array-of-flat-paths-into-a-json-tree-like-structure/
function flatListToTree (dropboxResponse) {
  const dropboxEntries = dropboxResponse.entries
  var tree = []

  // This example uses the underscore.js library.
  dropboxEntries.forEach(function (dropboxEntry) {
    const pathParts = dropboxEntry.path_lower.split('/')
    pathParts.shift() // Remove first blank element from the parts array.

    let currentLevel = tree // initialize currentLevel to root

    const n = pathParts.length
    pathParts.forEach(function (part, i) {
      const existingPath = currentLevel.find(item => item.name === part)

      if (existingPath) {
        // The path to this item was already in the tree, so don't add it again.
        // Set the current level to this path's children
        currentLevel = existingPath.children
      } else {
        var newPart = {
          name: part,
          children: []
        }

        if (i === n - 1) {
          newPart.item = dropboxEntry
        }

        currentLevel.push(newPart)
        currentLevel = newPart.children
      }
    })
  })

  return tree[0]
}

function treeToEventData (tree) {
  const reshapedTree = {
    name: tree.name,
    locations: tree.children.map(child => ({
      name: child.name,
      categories: child.children.filter(child => child.item['.tag'] === 'folder')
        .map(category => ({
          name: category.name,
          images: category.children.map(child => ({
            name: child.name,
            path: child.item.path_lower,
            getThumbnailBlob () {
              return dbx.filesGetThumbnail({path: child.item.id, size: 'w640h480'})
                .then(response => response.fileBlob)
            }
          }))
        })),
      latLng: (function () {
        const locationEntry = child.children.find(child => /\.latLng/i.test(child.name))
        if (locationEntry) {
          const numbers = locationEntry.name.match(/\d+/g)
          const lat = +(numbers[0] + '.' + numbers[1])
          const lng = +(numbers[2] + '.' + numbers[3])
          return [lat, lng]
        }
      })()
    }))
  }

  reshapedTree.locations = reshapedTree.locations.sort((a, b) => {
    var nameA = a.name.toUpperCase()
    var nameB = b.name.toUpperCase()
    if (nameA < nameB) {
      return -1
    } else if (nameA > nameB) {
      return 1
    } else {
      return 0
    }
  })

  return reshapedTree
}

function filesListFolder (options) {
  return dbx.filesListFolder(options)
    .then(function (response) {
      return response.entries.map(entry => new Folder(entry))
    }).catch(logAndRethrowError)
}

function logAndRethrowError (error) {
  console.log(error)
  throw error
}

export default {
  getEvents () {
    return filesListFolder({path: ''})
  },

  init
}
