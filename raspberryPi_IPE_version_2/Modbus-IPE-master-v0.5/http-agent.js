import request from 'request-promise';
import {cseUrl, fcntUrls} from './config'
//import slave from './app.js'

export async function uploadMonitoringData(data) {
    for (const module in fcntUrls) {
        /*if(JSON.stringify(data[module]) === '{}'){
            console.log('NULL data')
	    slave.close()
	    slave = await connect()
	    console.log('reconnected the slave 2')
	}*/
	try{
		await updateFlexContainer(cseUrl.concat(fcntUrls[module]), data[module])
	} catch(e){
		console.log("updateFlexContainer error")
	}
    }
    // await updateFlexContainer(cseUrl.concat(fcntUrls['battery']), data['battery'])
}

async function updateFlexContainer(url, data) {
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
	console.log(data);
        return await request(options);
    } catch (e) {
        console.log('PUT request error: ', e);
    }
}

async function reconnect(url, data){
	let options = {
        uri: url,
        method: 'POST',
        body:{

        },
        json:true //json으로 보낼경우 true로 해주어야 header값이 json으로 설정됩니다.
    };
    try{
        return await request(options);
    } catch (e) {
	console.log(e);
        console.log('Reconnect ERROR');
    }
}
