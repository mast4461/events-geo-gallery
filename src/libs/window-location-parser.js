function getHashParameters () {
  return window.location.hash.substring(1).split('&').reduce((acc, pairString) => {
    const [key, value] = pairString.split('=')
    acc[key] = value
    return acc
  }, {})
}

function getAccessToken () {
  const params = getHashParameters()
  const key = 'access_token'

  return params.hasOwnProperty(key) ? params[key] : undefined
}

export { getHashParameters, getAccessToken }
