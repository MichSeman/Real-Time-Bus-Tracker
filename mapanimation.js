// This array contains the coordinates for all bus stops between MIT and Harvard
const busStops = [
  [-71.093729, 42.359244],
  [-71.094915, 42.360175],
  [-71.0958, 42.360698],
  [-71.099558, 42.362953],
  [-71.103476, 42.365248],
  [-71.106067, 42.366806],
  [-71.108717, 42.368355],
  [-71.110799, 42.369192],
  [-71.113095, 42.370218],
  [-71.115476, 42.372085],
  [-71.117585, 42.373016],
  [-71.118625, 42.374863],
];

mapboxgl.accessToken = 'pk.eyJ1IjoibWljaGVsbGVzZW1hbiIsImEiOiJja3dqdTY4Y3cxbHFsMnZ1dDZueXZqNzRpIn0.l4TVsqjd4obmmp9GtkkJDg';

// This is the map instance
let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-71.104081, 42.365554],
  zoom: 14,
});
let marker = new mapboxgl.Marker()
  .setLngLat([-71.092761, 42.357575])
  .addTo(map);

// counter here represents the index of the current bus stop. Counter to access bus stops in the array busStops
//calling timer for 1000ms
let counter = 0;
function move() {
  setTimeout(){
    if(counter <= busStops.length) return;
    marker.setLngLat(busStops[counter]);
    counter++
    move();
  }, 1000);
}
const geojson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-71.116943, 42.374443]
        },
        properties: {
          title: 'Mapbox',
          description: 'Harvard'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-71.092003, 42.360001]
    
        },
        properties: {
          title: 'Mapbox',
          description: 'MIT'
        }
      }
    ]
  };

// add city markers to map
for (const feature of geojson.features) {
  // create a HTML element for each feature
  const el = document.createElement('div');
  el.className = 'marker';

  // make a marker for each feature and add to the map
  new mapboxgl.Marker(el)
  .setLngLat(feature.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }) // add popups
      .setHTML(
        `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
      )
  )
  .addTo(map); 
}

if (typeof module !== 'undefined') {
  module.exports = { move };
}
