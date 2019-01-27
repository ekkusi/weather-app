require('dotenv').config();
const axios = require('axios');

const convertTemp = require('../utils/fahrenheitToCelsius').convertToCelsius;

const getWeather = (address) => {
  
  const encodedAddress = encodeURIComponent(address);
  const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${process.env.GOOGLE_HTTP_API}`;
  
  const weather = {}

  return new Promise((resolve, reject) => {
    if (address.length === 0) {
      reject('Give an address');
    }
    axios.get(geocodeUrl).then((response) => {
      if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address.');
      } else if (response.data.status === 'REQUEST_DENIED') {
        throw new Error('Given Google API key is not valid');
      }
  
      const lat = response.data.results[0].geometry.location.lat;
      const lng = response.data.results[0].geometry.location.lng;
      weather.address = response.data.results[0].formatted_address;
      const weatherUrl = `https://api.darksky.net/forecast/${process.env.DARK_SKY_API}/${lat},${lng}`
      return axios.get(weatherUrl);
    }).then((response) => {
      weather.temperature = convertTemp(response.data.currently.temperature);
      weather.apparentTemperature = convertTemp(response.data.currently.apparentTemperature);
      resolve(weather);
    }).catch((error) => {
      if (error.code === 'ENOTFOUND') {
        reject('Unable to connect to APIs');
      } else {
        reject(error.message);
      }
    })
  });
}

module.exports = {
  getWeather
}