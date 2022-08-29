import ModbusRTU from 'modbus-serial'
import {slaveConfig} from "./config";

/*let client = new ModbusRTU();

export default async function connect() {
    //console.log("-- call connect")
    if(client.isOpen){
	client.close();
    }
    client.setTimeout(2000);
    client.setID(1);
    try{
        await client.connectRTU(slaveConfig.port, {baudRate: slaveConfig.baudRate, parity: slaveConfig.parity});
        return client;
    } catch(e){
        console.log(e);
    }
    //await client.connectRTU(slaveConfig.port, {baudRate: slaveConfig.baudRate, parity: slaveConfig.parity});
  // return client;
//return true;
}*/


let client = new ModbusRTU(); //check connect시에 new해야 할 수도

var networkErrors = ["ESOCKETTIMEDOUT", "ETIMEDOUT", "ECONNRESET", "ECONNREFUSED", "EHOSTUNREACH"];

/*
export default async function connect() {
    client.setTimeout(2000);
    client.setID(1);
    try{
        await client.connectRTU(slaveConfig.port, {baudRate: slaveConfig.baudRate, parity: slaveConfig.parity});
        return client; 
    } catch(e){
        console.log(e);
    }
//return true;
}
*/
var connectClient = function()
{
    if(client.isOpen) {
        console.log('modbustru close');
        client.close();
    }

    client.setTimeout(2000);
    client.setID(1);

    console.log('modbustru connect');
    client.connectRTU(slaveConfig.port, {baudRate: slaveConfig.baudRate, parity: slaveConfig.parity})
    .then(function() {
        console.log("Connected"); })
    .catch(function(e) {
        if(e.errno) {
            if(networkErrors.includes(e.errno)) {
                console.log("ModbusRTU need to reconnect");
            }
        }
        console.log(e.message);
    });
}

export { client, connectClient }
