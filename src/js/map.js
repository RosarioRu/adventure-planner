import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';


export function Coordinates(coordinates) {
  const lng = coordinates.lng;
  const lat = coordinates.lat;
  console.log([lat, lng]);
  return [lng, lat];
}


export function Map() {

  // let coords = Coordinates();
  // const lng = coords[0];
  // const lat = coords[1];

  // console.log([lat, lng]);

  const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
  mapboxgl.accessToken = `${process.env.MAPBOX_API_KEY}`;
  const map = new mapboxgl.Map({
    container: 'mapView',
    style: 'mapbox://styles/mapbox/outdoors-v11',
    center: [-122.6784, 45.5152],
    zoom: 9
  });

  const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    marker: false,
    mapboxgl: mapboxgl,
  });


  geocoder.on('result', e => {
    e.result.center;
  });
  
  
  // geocoder.on('results', function(results) {
  //   let lng = results.features[0].center[0];
  //   let lat = results.features[0].center[1];
  //   console.log([lng, lat]);
  // });
  map.addControl(geocoder);

  const start = [-122.662323, 45.523751];

  // api call to directions service and draw route lines and points
  async function getRoute(end) {
    // make directions request using cycling profile
    const query = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/walking/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
      { method: 'GET' }
    );
    const json = await query.json();
    const data = json.routes[0];
    const route = data.geometry.coordinates;
    const geojson = {
      'type': 'Feature',
      'properties': {},
      'geometry': {
        'type': 'LineString',
        'coordinates': route
      }
    };
    // if the route already exists on the map, we'll reset it using setData
    if (map.getSource('route')) {
      map.getSource('route').setData(geojson);
    }
    // otherwise, we'll make a new request
    else {
      map.addLayer({
        'id': 'route',
        'type': 'line',
        'source': {
          'type': 'geojson',
          'data': geojson
        },
        'layout': {
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'line-color': '#3887be',
          'line-width': 5,
          'line-opacity': 0.75
        }
      });
    }
  
    // get the sidebar and add the instructions
    const instructions = document.getElementById('instructions');
    const steps = data.legs[0].steps;
  
    let tripInstructions = '';
    for (const step of steps) {
      tripInstructions += `<li>${step.maneuver.instruction}</li>`;
    }
    instructions.innerHTML = `<p><strong>Trip duration: ${Math.floor(
      data.duration / 60
    )} min 🥾 </strong></p><ol>${tripInstructions}</ol>`;
  }
  
  map.on('load', () => {
    // make an initial directions request that
    // starts and ends at the same location
    getRoute(start);
  
    // Add destination to the map
    map.addLayer({
      'id': 'point',
      'type': 'circle',
      'source': {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': [
            {
              'type': 'Feature',
              'properties': {},
              'geometry': {
                'type': 'Point',
                'coordinates': start
              }
            }
          ]
        }
      },
      'paint': {
        'circle-radius': 10,
        'circle-color': '#3887be'
      }
    });
  
    // allow the user to click the map to change the destination
    map.on('click', (event) => {
      const coords = Object.keys(event.lngLat).map(
        (key) => event.lngLat[key]
      );
      const end = {
        'type': 'FeatureCollection',
        'features': [
          {
            'type': 'Feature',
            'properties': {},
            'geometry': {
              'type': 'Point',
              'coordinates': coords
            }
          }
        ]
      };
      if (map.getLayer('end')) {
        map.getSource('end').setData(end);
      } else {
        map.addLayer({
          'id': 'end',
          'type': 'circle',
          'source': {
            'type': 'geojson',
            'data': {
              'type': 'FeatureCollection',
              'features': [
                {
                  'type': 'Feature',
                  'properties': {},
                  'geometry': {
                    'type': 'Point',
                    'coordinates': coords
                  }
                }
              ]
            }
          },
          'paint': {
            'circle-radius': 10,
            'circle-color': '#f30'
          }
        });
      }
      getRoute(coords);
    });
  });
  return map;
}


