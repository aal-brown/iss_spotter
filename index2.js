const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss_promised');


/* fetchMyIP()
  .then(fetchCoordsByIP)
  .then((coords) => {
    console.log(coords);
  }); */


const printPassTimes = function(passTimes) {
  passTimes = JSON.parse(passTimes).response;
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

// fetchMyIP()
//   .then(fetchCoordsByIP)
//   .then(fetchISSFlyOverTimes)
//   .then((times) => printPassTimes(times))

//nexISSTimesForMyLocation((times) => printPassTimes(times))

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work:", error.message);
  });
  