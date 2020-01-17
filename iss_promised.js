const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function(IP) {
  const ip = JSON.parse(IP).ip;
  return request(`https://ipvigilante.com/json/${ip}`);
};


const fetchISSFlyOverTimes = function(coords) {
  const recObj = JSON.parse(coords);
  const LAT = recObj.data.latitude;
  const LON = recObj.data.longitude;
  return request(`http://api.open-notify.org/iss-pass.json?lat=${LAT}&lon=${LON}`);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP() //why do we have to use return here? I guess otherwise we will be returning timesObj immediately? Because this function is asynchronous unless we have a callback in it, which  is why it worked for me before with a callback.
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((timesObj) => {
      return timesObj;
    });
};



module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};
