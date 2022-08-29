//Preparing the application to start'

var express = "";
var bodyParser = "";

//Prepare For Logging

var logConfig = {
	appenders: {
		everything: { type: 'file', filename: './log/logging.log' }
	  },
	  categories: {
		default: { appenders: [ 'everything' ], level: 'debug' }
	  }
};
var log = require('log4js').configure(logConfig);
const logger = log.getLogger();


//Load Configuration File
var appConfig = "";
var loadingApp = false;

var port = "";
var requestHeader = "";
var diURL = [];
var pgURL = [];
var conURL = [];
var battURL = [];
var warnURL = "";

//MQTT
var mqtt = "";
var clientMqtt = "";

//Socket.io
//const io = "";

try{

	appConfig = require('./config/app_config.js');
	express = require('express');
	bodyParser = require('body-parser');
	
	//io = require('socket.io')(19997);

	//PORT
	port = appConfig.port;

	requestHeader = {
		"header" : {
			"Accept" : appConfig.requestHeader.Accept,
			"X-M2M-RI" : appConfig.requestHeader.XM2MRI,
			"X-M2M-Origin" : appConfig.requestHeader.XM2MOrigin	
		}
	}

	
	//Flag for running the application
	loadingApp = true;

}catch(e){
	console.log("Application is failed to start. "+e);
	logger.error("Application is failed to start. "+e);
}



if(loadingApp){

		const util = require('util');
		var app = express();
		app.use(bodyParser.urlencoded({ extended: false }));
		app.use(bodyParser.json());

		const io = require('socket.io')(19997,{ origins: '*:*'});
	
		app.post('/solar', (req, res) => {

			res = setReponseHeader(res);
			res.statusCode = 200 ; 
			res.send("Successful");
			
			//console.log("Incoming Solar Data = "+JSON.stringify(req.body));

				/*var worker = getRequestedData;
				
				try{
					console.log("Push Solar Data.");
					worker.doWork(req, res, "Solar",solarEventEntityName, solarChannelName, io);
				
				}catch(e){
					console.log("Failed to Retrieve and to Push Solar Data" +e);
				}
				finally{
					delete worker;
					
				}*/
				
				io.on('connection', function(socket){
						//socket.emit('sendDeviceLocation', 'my device location');
						console.log("Help Me hhhhhhhhhhhhhhhhh");
					
				});
		
				
				
				var pusher = io.of('/solarCurrent').on('connection', function(socket){
					console.log("Push to Client!");
					//socket.emit('current', req.body);	
				});

			
				
			
		});
	
		function setReponseHeader(res){
			
			res.setHeader('Content-Type', 'application/json');
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
			
			return res;
		
		}	
		
		app.listen(port, () => console.log('This app is listening on port 19998! and with POST listening and web socket is on port 19997!'));
		
}


