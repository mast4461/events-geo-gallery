# events-geo-gallery

> Showing geo-tagged images in various categories for different events

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test

# deploy dist folder (populated with build command) to github pages
npm run deploy
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# Using the app

If the URL you use to access the app doesn't have an properly formatted access token in the hash part of the URL, you will be redirected to dropbox were you will be promted to authorize the app. Once you have authorized the app you will be directed back to the app with a URL containing a properly formatted access token so that the app functions properly.

Once you have authorized the app the path "App > events-geo-gallery" will have been created in your dropbox account. You will need to put folders and files in there to provide the app with data. Here's an example illustrating how to organize the contents:

```
events-geo-gallery
  event1
    ...
  event2
    location1
      location.geo.json
      category1
        image1.jpg
        image2.png
      category2
        image3.jpg
        image4.jpeg
        image41.jpeg
    location2
      location.geo.json
      category1
        image5.jpeg
        image6.jpg
      category2
        image7.jpg
      category3
        image8.jpg
        image9.jpg
    ...
```

Note that each `location` folder contains a file called `location.geo.json`, which contains the coordinates for the location. You can create new such files by using the point feature at [geojson.io](http://geojson.io/). Example `location.geo.json`:

```
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          17.578125,
          59.88893689676585
        ]
      }
    }
  ]
}
```