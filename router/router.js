const express = require('express');
const router = express.Router();

const getWeather = require('../weather/weather-2').getWeather;

router.get('/', (req, res) => {
  res.render('home.hbs');
});

router.get('/weather', (req, res) => {
  const address = req.query.address;
  if (address === undefined) {
    res.render('home.hbs');
  }
  let weather, error;
  getWeather(address).then((response) => {
    weather = response;
    res.render('home.hbs',  {
      weather: weather
    });
  }, (errorMessage) => {
    error = errorMessage;
    res.render('home.hbs',  {
      error: error
    });
  });
});

module.exports = router;