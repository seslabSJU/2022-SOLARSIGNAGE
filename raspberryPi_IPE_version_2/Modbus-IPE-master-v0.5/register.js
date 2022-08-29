class Register {
    constructor(name, slave, address, length, scale, value){
        if (new.target === Register) {
            throw new TypeError("Cannot construct Register instances directly");
        }
        this.name = name;
        this.address = address;
        this.length = length;
        this.slave = slave;
        this.scale = scale;
        this.value = value;
    }
    getName(){
        return this.name;
    }
}

export class DiscreteInput extends Register{
    constructor(name, slave, address, length, scale, value){
        super(name, slave, address, length, scale, value)
    }
    async read(){
        try {
            return  this.slave.readDiscreteInputs(this.address, this.length);
        } catch (e) {
            console.log(e.message)
        }
    }
}

export class Coil extends Register {
    constructor(name, slave, address, length, scale, value){
        super(name, slave, address, length, scale, value)
    }
    async read(){
        try {
            return  this.slave.readCoils(this.address, this.length);
        } catch (e) {
            console.log(e.message)
        }
    }
    async write(value){
        try {
            return  this.slave.writeCoil(this.address, value);
        } catch (e) {
            console.log(e.message)
        }
    }
}

export class InputRegister extends Register{
    constructor(name, slave, address, length, scale, value){
        super(name, slave, address, length, scale, value)
    }
    async read(){
        try {
            return  this.slave.readInputRegisters(this.address, this.length);
            //return readForTest(this.address, this.length);
        } catch (e) {
            console.log(e.message)
        }
    }
}

export class HoldingRegister extends Register{
    constructor(name, slave, address, length, scale, value){
        super(name, slave, address, length, scale, value)
    }
    async read(){
        try {
            return  this.slave.readHoldingRegisters(this.address, this.length);
        } catch (e) {
            console.log(e.message)
        }
    }

    async write(value){
        try {
            return  this.slave.writeRegister(this.address, value);
        } catch (e) {
            console.log(e.message)
        }
    }
}

function readForTest(len) {
    var data = { data: '12, 0' };
    //console.log(data)
    return data;
}