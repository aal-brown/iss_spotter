

const { nextISSTimesForMyLocation} = require('./iss');


/* fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
}); */


/* fetchCoordsByIP("207.228.85.169", (error, coords) => {

  if (error) {
    console.log("it didn't work!", error);
    
  } else {

    console.log("It worked! Returned Coords:", coords);
  }

}); */

/* const latlong = {latitude: "43.6319", longitude: "-79.3716"};


issFlyOverTimes(latlong, (error, flyTimes) => {

  if (error) {
    console.log("it didn't work!", error);
    
  } else {

    console.log("It worked! flyover times:", flyTimes);
  }

}); */

// index.js

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});