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
var io = "";

try{

	appConfig = require('./config/app_config.js');
	express = require('express');
	bodyParser = require('body-parser');
	//io = require('socket.io')(19997,{ origins: '*:*'});
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
		const publicRoot = 'index.js';
		var app = express();
		var http = require('http').Server(app);
		app.use(bodyParser.urlencoded({ extended: false }));
		app.use(bodyParser.json());
		app.use(express.static(publicRoot));
		io = require('socket.io')(http);
	
		

		var solarEventEntityName = ["current", "voltage","power", "daily", "monthly", "annual", "total"];
		var solarChannelName = ["/solarCurrent", "/solarVoltage","/solarPower", "/solarDaily", "/solarMonthly", "/solarAnnual", "/solarTotal"];

		var batteryEventEntityName = ["level", "current","voltage", "power", "charging", "discharging"];
		var batteryChannelName = ["/battLevel", "/battCurrent","/battVoltage","/battPower", "/battCharging", "/battDischarging"];

		var loadEventEntityName = ["current", "voltage","power", "daily", "monthly", "annual", "total"];
		var loadChannelName = ["/loadCurrent", "/loadVoltage","/loadPower", "/loadDaily", "/loadMonthly", "/loadAnnual", "/loadTotal"];


		/*var deviceType = io.of('/deviceType').on('connection', 
			socket=>{
			socket.emit('sendDeviceType', 'my device type');
			console.log("Allah is great!");	
			
			}
		);*/

		var getRequestedData = {
			//doWork : function (req, res, activityName, eeName, channelName, io){	
				doWork : function (req, res, activityName, channelName)	{
				
				res = setReponseHeader(res);
				res.statusCode = 200 ; 
				res.send("Successful");

				var sentData = req.body['m2m:sgn']['m2m:nev']['m2m:rep']['m2m:fcnt'];
				
				//io.of(channelName).on('connection', function(socket){
				io.on('connection', function(socket){	
					console.log("Send!");
					socket.emit('incomingData', sentData);	
				});

				console.log("Suckseed!!!!!!!!!!!!!!!");
				/*for(i=0; i<eeName.length; i++){

					var sentData = req.body['m2m:sgn']['m2m:nev']['m2m:rep']['m2m:fcnt'][eeName[i]];
					
					//console.log(activityName + " retrieved data = "+eeName[i]+" || "+sentData+" || Channel Name = "+channelName[i]);
					//console.log(activityName + " retrieved data = "+eeName[i]+" || "+sentData);
					
					//pushToClient(sentData, channelName[i], eeName[i]);
					var pusher = io.of(channelName[i]).on('connection', function(socket){
							console.log("Push to Client!");
							console.log("Push event name = "+eeName[i]+" || "+sentData);
							socket.emit(eeName[i], sentData);	
						});
						
	
				}*/

				//var sentData = req.body['m2m:sgn']['m2m:nev']['m2m:rep']['m2m:fcnt']['current'];
				
				/*var pusher = io.of('/solarCurrent').on('connection', function(socket){
					console.log("Push to Client!");
					console.log("Push event name = current || "+sentData);var deviceLocation = io.of('/deviceLocation').on('connection', function(socket){
			console.log("How deep is your love");
			socket.emit('sendDeviceLocation', 'my device location');	
		})

					socket.emit('current', sentData);	
				});*/

				
				
			}
		};

		function pushToClient(sentData, channelName, eeName) {
			
			return new Promise(function(resolve, reject) {
			
				io.of(channelName[i]).on('connection', function(socket){
					if (err) {
						reject(err);
					} else {
						console.log("Push to Client!");
						console.log("Push event name = "+eeName+" || "+sentData);
						resolve(socket.emit(eeName, sentData));
					}
				
				
				});

			})
		
		}

		app.get("/", (req, res, next) => {
			res.sendFile("/", { root: publicRoot })
		  })

		app.post('/solar', (req, res) => {

			/*res = setReponseHeader(res);
			res.statusCode = 200 ; 
			res.send("Successful");*/
			
			console.log("Incoming Solar Data = "+JSON.stringify(req.body));

				var worker = getRequestedData;
				
				try{
					console.log("Push Solar Data.");
					worker.doWork(req, res, "Solar", "/solar");
				
				}catch(e){
					console.log("Failed to Retrieve and to Push Solar Data" +e);
				}
				finally{
					delete worker;
					
				}
				
			
		});
		
		app.post('/battery', (req, res) => {

			io.of('/deviceLocation').on('connection', function(socket){
				//socket.emit('sendDeviceLocation', 'my device location');
				console.log("Help Me");
			
			});
			
			/*console.log("Incoming Battery Data = "+JSON.stringify(req.body));
			
			var worker = getRequestedData;
			
			try{
				console.log("Push Battery Data.");
				worker.doWork(req, res, "Battery", batteryEventEntityName, batteryChannelName);
			
			}catch(e){
				console.log("Failed to Retrieve and to Push Battery Data"+e);
			}
			finally{
				delete worker;
				
			}*/

			res = setReponseHeader(res);
			res.statusCode = 200 ; 
			res.send("Successful");
		
		});

		app.post('/load', (req, res) => {
			
			console.log("Incoming Load Data = "+JSON.stringify(req.body));

			var worker = getRequestedData;
			
			try{
				console.log("Push Load Data.");
				worker.doWork(req, res, "Load", loadEventEntityName, loadChannelName);
			
			}catch(e){
				console.log("Failed to Retrieve and to Push Load Data"+e);
			}
			finally{
				delete worker;
				
			}
	
		});
		
		
		
		function setReponseHeader(res){
			
			res.setHeader('Content-Type', 'application/json');
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
			
			return res;
		
		}	
		
		
		
		function getResultFromMobius(destinationUrl, res, activityName){
		
			console.log("Open Sesame - "+activityName);
			logger.debug("Get "+activityName+ "Data");
			
			// Setting URL and headers for request
			var options = {
				url: destinationUrl,
				headers : requestHeader
				
			};
			
			var getData = getMobiusData(options);
			res = setReponseHeader(res);
			getData.then(function(result) {
			
			var sentResult = {"finalResult" : result['m2m:cin']['con']};
			res.send(sentResult);
		
			}, function(err) {
			
			res.statusCode = 404; 
			res.send("{result : Failed Retriving}");
			
			console.log("Failed to Retrieve "+activityName+" "+err);
			logger.error("Failed to Retrieve "+activityName+" "+err);
				
			})
			
		}
			
		function getMobiusData(options) {
			const request = require("request");
			// Return new promise 
			return new Promise(function(resolve, reject) {
				// Do async job
				request.get(options, function(err, resp, body) {
					if (err) {
						reject(err);
					} else {
						resolve(JSON.parse(body));
					}
				})
			})
		
		}

		//console.log("Get Data From Config -->"+ appConfig.get('Test.Gretting')+" and "+appConfig.get('Test-2.Gretting'));

		//MQTT Part


		app.listen(port, () => console.log('This app is listening on port 19998! and with POST listening and web socket is on port 19997!'));
		
}


