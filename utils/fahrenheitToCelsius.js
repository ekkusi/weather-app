const convertToCelsius = (tempC) => {
  return Math.round((tempC - 32) * 5 / 9);
}

module.exports = {
  convertToCelsius
}