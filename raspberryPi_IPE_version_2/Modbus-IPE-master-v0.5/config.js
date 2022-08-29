export const slaveConfig = {
    port: "/dev/ttyXRUSB0",
    baudRate: 115200,
    parity: "none",
    dataBits: 8,
    stopBits: 1
};

export const cseUrl = 'http://34.64.70.229:8080';

export const fcntUrls = {
    battery: '/~/in-cse/fcnt-36457514',
    energyGeneration: '/~/in-cse/fcnt-862102580',
    energyConsumption: '/~/in-cse/fcnt-443342727'
};
