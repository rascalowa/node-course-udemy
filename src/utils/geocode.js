const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoicmFzY2Fsb3dhIiwiYSI6ImNsNWo5eDl2cTBmeWszYnBmM21ubmoyYWIifQ.xtfC6a0IotHhZ7NtFK8rhg&limit=1";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Oops, geo is unable to connect!");
    } else if (body.features.length === 0) {
      callback("Unable to find geolocation. Try again with different input.");
    } else {
      const { center, place_name: location, text: name } = body.features[0];

      callback(undefined, {
        longitude: center[0],
        latitude: center[1],
        location,
        name
      });
    }
  });
};

module.exports = geocode;
