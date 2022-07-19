const request = require("request");

const forecast = (address, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=a6d52480932968e05db269e3bc0fc192&query=" +
    encodeURIComponent(address);

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Oops, we are unable to connect!");
    } else if (response.body.error) {
      callback("Unable to find forecast. Try again with different input.");
    } else {
      const {
        weather_descriptions: description,
        temperature,
        precip = 3,
        humidity = 60
      } = response.body.current;

      const forecast =
        description +
        ". It is currently " +
        temperature +
        " degrees out. There is a " +
        precip +
        "% chance of rain. The humidity is " +
        humidity + "%.";

      callback(undefined, forecast);
    }
  });
};

module.exports = forecast;
