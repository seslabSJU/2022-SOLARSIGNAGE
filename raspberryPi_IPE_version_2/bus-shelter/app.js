import bodyParser from 'body-parser';
import express from 'express';
import onoff from 'onoff';

const Gpio = onoff.Gpio;

/*
LED Light
GPIO 5: LED Light 1
GPIO 6: LED Light 2
*/
const led1 = new Gpio(5, 'out');
const led2 = new Gpio(6, 'out');

/*
Awning
GPIO 22: STOP
GPIO 23: OPEN
GPIO 24: CLOSE
*/
const stop = new Gpio(22, 'out');
const open = new Gpio(23, 'out');
const close = new Gpio(24, 'out');

/*
DC-AC Inverter
GPIO 18: Inverter ON/OFF
*/
const inverter = new Gpio(18, 'out');

const app = express();
const port = 3002;
app.use(bodyParser.json());

app.post('/led1', async function(req, res) {
    if(req.body['m2m:sgn'].hasOwnProperty('m2m:nev')) {
        let status = req.body['m2m:sgn']['m2m:nev']['m2m:rep']['m2m:cin']['con']
        if(status === 'on') {
            if(led1.readSync() === 0) {
                led1.writeSync(1);
                console.log('[LED1 ON]');
            }
        }
        else if(status === 'off') {
            if(led1.readSync() === 1) {
                led1.writeSync(0);
                console.log('[LED1 OFF]');
            }
        }
    }
    res.sendStatus(200);
});

app.post('/led2', async function(req, res) {
    if(req.body['m2m:sgn'].hasOwnProperty('m2m:nev')) {
        let status = req.body['m2m:sgn']['m2m:nev']['m2m:rep']['m2m:cin']['con']
        if(status === 'on') {
            if(led2.readSync() === 0) {
                led2.writeSync(1);
                console.log('[LED2 ON]');
            }
        }
        else if(status === 'off') {
            if(led2.readSync() === 1) {
                led2.writeSync(0);
                console.log('[LED2 OFF]');
            }
        }
    }
    res.sendStatus(200);
});

app.post('/awning', async function(req, res) {
    if(req.body['m2m:sgn'].hasOwnProperty('m2m:nev')) {
        let status = req.body['m2m:sgn']['m2m:nev']['m2m:rep']['m2m:cin']['con']
        if(status === 'stop') {
            open.writeSync(0);
            close.writeSync(0);
            stop.writeSync(1);
            console.log('[AWNING STOP]');
        }
        else if(status === 'open') {
            stop.writeSync(0);
            close.writeSync(0);
            open.writeSync(1);
            console.log('[AWNING OPEN]');
        }
        else if(status === 'close') {
            stop.writeSync(0);
            open.writeSync(0);
            close.writeSync(1);
            console.log('[AWNING CLOSE]');
        }
    }
    res.sendStatus(200);
});

app.post('/inverter', async function(req, res) {
    if(req.body['m2m:sgn'].hasOwnProperty('m2m:nev')) {
        let status = req.body['m2m:sgn']['m2m:nev']['m2m:rep']['m2m:cin']['con']
        if(status === 'on') {
            inverter.writeSync(1);
            console.log('[DC-AC INVERTER ON]');
        }
        else if(status === 'off') {
            inverter.writeSync(0);
            console.log('[DC-AC INVERTER OFF]');
        }
    }
    res.sendStatus(200);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

process.on('SIGINT', _ => {
    console.log("Caught interrupt signal");
    led1.unexport();
    led2.unexport();
    stop.unexport();
    open.unexport();
    close.unexport();
    inverter.unexport();
    process.exit(0);
});