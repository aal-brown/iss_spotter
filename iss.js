/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require("request");

const URL = "https://api6.ipify.org/?format=json";

const fetchMyIP = function(callback) {
  request(URL, (error,resp,body) => {
  
    if (error) {
      callback(error, null);
      return;

    }
    if (resp.statusCode !== 200) {
      const msg = `Status Code ${resp.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
       
    } else {
      const data = JSON.parse(body);
      const IPaddress = data.ip;
      callback(null,IPaddress);
    }
  });
};

const geoURL = "https://ipvigilante.com/";

const fetchCoordsByIP = function(ipString, callback) {

  request((geoURL + ipString), (error,resp,body) => {
  
    if (error) {
      callback(error, null);
      return;

    }
    if (resp.statusCode !== 200) {
      const msg = `Status Code ${resp.statusCode} when fetching coords from IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
        
    } else {
      const recObj = JSON.parse(body);
      const coordinates = {latitude: recObj.data.latitude, longitude: recObj.data.longitude};
      callback(null, coordinates);
    }
  });
};




const issFlyOverTimes = function(coords, callback) {

  const spaceURL = "http://api.open-notify.org/iss-pass.json?lat=LAT&lon=LON";

  const LAT = coords.latitude.toString();
  const LON = coords.longitude.toString();
  const filledURL = spaceURL.replace("LAT", LAT).replace("LON",LON);

  request(filledURL, (error,resp,body) => {
  
    if (error) {
      callback(error, null);
      return;

    }
    if (resp.statusCode !== 200) {
      const msg = `Status Code ${resp.statusCode} when fetching ISS pass times. Response: ${body}`;
      callback(Error(msg), null);
      return;
        
    } else {
      const recObj2 = JSON.parse(body);
      const flyTimes = recObj2.response;
      callback(null, flyTimes);
    }
  });
};

const nextISSTimesForMyLocation = function(callback) {
  
  //This will output the IP that should be used by fetch coords
  fetchMyIP((error, IP) => { //this is an anonymous function that takes in the error and IP and does the following.
    
    if (error) {
      
      return callback(error, null);
    }

    fetchCoordsByIP(IP, (error,coords) => {

      if (error) {
      
        return callback(error, null);
      }

      issFlyOverTimes(coords,(error,flyTimes) => {

        if (error) {
      
          return callback(error, null);
        }

        return callback(null, flyTimes);
      });
    });
  });
};





module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  issFlyOverTimes,
  nextISSTimesForMyLocation
};