import bodyParser from 'body-parser';
import express from 'express';

import {uploadMonitoringData} from './http-agent';
import {monitor, writeCharging, writeDischarging} from './modbus-master';
import {connectClient} from "./slave-connection";
//import close from "./slave-connection";
/*connect().then(slave => {
    monitor(slave, 6000, uploadMonitoringData);

    const app = express();
    const port = 3001;
    app.use(bodyParser.json());

     //app.post('/charging', async function(req, res) {
     //    const chargingValue = req.body["m2m:sgn"]["m2m:nev"]["m2m:rep"]["m2m:fcnt"]["charging"];
     //    if (chargingValue === 0 || 1){
     //        const data = await writeCharging(slave, chargingValue);
     //        console.log(data);
     //    }
     //    res.sendStatus(200);
     //});
     //app.post('/discharging', async function(req, res) {
     //    const dischargingValue = req.body["m2m:sgn"]["m2m:nev"]["m2m:rep"]["m2m:fcnt"]["discharging"];
     //    if (dischargingValue === 0 || 1){
     //        const data = await writeDischarging(slave, dischargingValue);
     //       console.log(data);
     //    }
     //    res.sendStatus(200);
     //});

    app.post('/write', async function(req, res) {
        let chargingValue, dischargingValue;
        if (req.body["m2m:sgn"].hasOwnProperty('m2m:nev')) {
            if (req.body["m2m:sgn"]["m2m:nev"]["m2m:rep"]["m2m:fcnt"].hasOwnProperty('charging')) {
                chargingValue = Number(req.body["m2m:sgn"]["m2m:nev"]["m2m:rep"]["m2m:fcnt"]["charging"]);
                 console.log('IF charging');
            }
            if (req.body["m2m:sgn"]["m2m:nev"]["m2m:rep"]["m2m:fcnt"].hasOwnProperty('discharging')) {
                dischargingValue = Number(req.body["m2m:sgn"]["m2m:nev"]["m2m:rep"]["m2m:fcnt"]["discharging"]);
                 console.log('IF discharging');
            }
        }

        if (chargingValue === 0 || 1 && chargingValue !== undefined){
            const data = await writeCharging(slave, chargingValue);
            console.log('charging:' + JSON.stringify(data));
        } else if(dischargingValue === 0 || 1 && dischargingValue !== undefined){
            const data = await writeDischarging(slave, dischargingValue);
            console.log('discharging:' + JSON.stringify(data));
        }
        res.sendStatus(200);
    });

    app.post('/reconnect', async function(req, res) {
        console.log('reconnect slave req', slave);
	//slave.close();
        slave = await connect();
        console.log('reconnected the slave', slave);
        res.sendStatus(200);
    });
	
    app.listen(port, () => console.log(`Example app listening on port ${port}!`));
}).catch(e => {
    console.log("Could not connect to slave device", e);
});*/

//check connect().then(slave => {
    connectClient();
    //check monitor(slave, 6000, uploadMonitoringData);
    monitor(6000, uploadMonitoringData);

    const app = express();
    const port = 3001;
    app.use(bodyParser.json());

    // app.post('/charging', async function(req, res) {
    //     const chargingValue = req.body["m2m:sgn"]["m2m:nev"]["m2m:rep"]["m2m:fcnt"]["charging"];
    //     if (chargingValue === 0 || 1){
    //         const data = await writeCharging(slave, chargingValue);
    //         console.log(data);
    //     }
    //     res.sendStatus(200);
    // });
    // app.post('/discharging', async function(req, res) {
    //     const dischargingValue = req.body["m2m:sgn"]["m2m:nev"]["m2m:rep"]["m2m:fcnt"]["discharging"];
    //     if (dischargingValue === 0 || 1){
    //         const data = await writeDischarging(slave, dischargingValue);
    //         console.log(data);
    //     }
    //     res.sendStatus(200);
    // });

    app.post('/write', async function(req, res) {
        let chargingValue, dischargingValue;
        if (req.body["m2m:sgn"].hasOwnProperty('m2m:nev')) {
            if (req.body["m2m:sgn"]["m2m:nev"]["m2m:rep"]["m2m:fcnt"].hasOwnProperty('charging')) {
                chargingValue = Number(req.body["m2m:sgn"]["m2m:nev"]["m2m:rep"]["m2m:fcnt"]["charging"]);
                 console.log('IF charging');
            }
            if (req.body["m2m:sgn"]["m2m:nev"]["m2m:rep"]["m2m:fcnt"].hasOwnProperty('discharging')) {
                dischargingValue = Number(req.body["m2m:sgn"]["m2m:nev"]["m2m:rep"]["m2m:fcnt"]["discharging"]);
                 console.log('IF discharging');
            }
        }

        if (chargingValue === 0 || 1 && chargingValue !== undefined){
            //check const data = await writeCharging(slave, chargingValue);
	try{
            const data = await writeCharging(chargingValue);
            console.log('charging:' + JSON.stringify(data));
	} catch(e){
		console.log(e);
	}
        } else if (dischargingValue === 0 || 1 && dischargingValue !== undefined){
            //check const data = await writeDischarging(slave, dischargingValue);
	try{
            const data = await writeDischarging(dischargingValue);
            console.log('discharging:' + JSON.stringify(data));
	} catch(e){
		console.log(e);
	}
        }
        res.sendStatus(200);
    });

    app.post('/reconnect', async function(req, res) {
        console.log('reconnect slave req');
        connectClient();
        console.log('reconnected the slave');

        res.sendStatus(200);
    });

    app.listen(port, () => console.log(`Example app listening on port ${port}!`));

//check }).catch(e => {
//check     console.log("Could not connect to slave device", e);
//check });
