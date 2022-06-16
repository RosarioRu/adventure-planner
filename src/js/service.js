// export default class GeoCoder {
//   static getCoordinates(address) {
//     fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${process.env.MAPBOX_API_KEY}`)
//       .then(function(response) {
//         if (!response.ok) {
//           throw Error(response.statusText);
//         } else {
//           return response.json();
//         }
//       });
//       .catch(function(error) {
//         return error;
//       });
//   }
  
// }

// .then(response => response.json())
//       .then((data) => {
//         const coordinates = {
//           lng: data.features[0].geometry.coordinates[0],
//           lat: data.features[0].geometry.coordinates[1]
//         };
//         return coordinates;
//       });

export default class GeoCoder  {
  static async getCoordinates(address) {
    try {
      const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${process.env.MAPBOX_API_KEY}`);
      if(response.status !== 200 && response === 403) {
        throw Error(response.statusText);
      } else {
        console.log(response.json());
      }
    } catch(error) {
      return error.response;
    }
  }
}