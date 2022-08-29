
//import request from 'request-promise';

const request = require('request-promise')
const Gpsd = require('node-gpsd-client')
var moment = require('moment');

const GPS_URL = 'http://34.64.70.229:8080/~/in-cse/fcnt-601273755';


let flexdata = {};

const client = new Gpsd({
  port: 2947,              // default
  hostname: 'localhost',   // default
  autoReconnect: 0,        // every 5 second
  parse: true
})

client.on('connected', () => {
  console.log('Gpsd connected')
  client.watch({
    class: 'WATCH',
    json: true,
    scaled: true
  })
})

client.on('error', err => {
  console.log(`Gpsd error: ${err.message}`)
})

client.on('TPV', data => {
  console.log(data)
  console.log("lat=", data.lat)
  console.log("long=", data.lon)

  flexdata['name'] = 'solar controller'
  flexdata['lat'] = data.lat
  flexdata['long'] = data.lon

  flexdata['starttime'] = getCurrentDate();
  
  console.log("flexdata=", flexdata)
  updateFlexContainer(GPS_URL, flexdata)

  client.disconnect();

})

client.connect();

setTimeout(() => {
  console.log("Disconnect in 30sec");
    // Chung-Ang University lat : 37.50528383664044, long : 126.95706901142802
    flexdata['name'] = 'solar controller'
    flexdata['lat']  = '0'
    flexdata['long'] = '0'
  
    flexdata['starttime'] = getCurrentDate();
    
    console.log("flexdata=", flexdata)
    updateFlexContainer(GPS_URL, flexdata)
  
    client.disconnect();
  
}, 30000);


function getCurrentDate() {
  require('moment-timezone');
  moment.tz.setDefault("Asia/Seoul");

  var date = moment().format('YYYY-MM-DD HH:mm:ss'); 
  //var date = moment();
  console.log(date);

  return date;
}

async function updateFlexContainer(url, data) {
  console.log("update data=",data)
  let options = {
      method: 'PUT',
      uri: url,
      port: 8080,
      body: {
          "m2m:fcnt": data
      },
      headers: {
          'Accept': 'application/json',
          'X-M2M-RI': 'ipe',
          'X-M2M-Origin': 'admin:admin',
          'Content-Type': 'application/json;ty=28'
      },
      json: true
  };
  try {
      return await request(options);
  } catch (e) {
      console.log('PUT request error: ', e);
  }
}

