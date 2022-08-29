/*
register types:
    1 - Discrete input (R)
    2 - Coil (R&W)
    3 - Input register (R)
    4 - Holding register (R&W)
 */
export const monitoringRegisters = {
    battery: {
        level: {
            address: 0x311A,
            type: 3,
            length: 1
        },
        current: {
            type: 3,
            address: 0x331B,
            length: 1,
            scale: 100
        },

        voltage: {
            address: 0x331A,               
            type: 3,
            length: 1,
            scale: 100
        },
        power: {
            address: 0x3106,
            type: 3,
            length: 2,
            scale: 100
        },
        maxvolt: {
            address: 0x3302,
            type: 3,
            length: 2,
            scale: 100
        },
        minvolt: {
            address: 0x3303,
            type: 3,
            length: 2,
            scale: 100
        },
        temp: {
            address: 0x331D,
            type: 3,
            length: 2,
            scale: 100
        }
    },
    energyGeneration: {
        power: {
            address: 0x3102,
            type: 3,
            length: 2,
            scale: 100
        },
        current: {
            address: 0x3101,
            type: 3,
            length: 1,
            scale: 100
        },
        voltage: {
            address: 0x3100,
            type: 3,
            length: 1,
            scale: 100
        },
        daily: {
            address: 0x330C,
            type: 3,
            length: 2,
            scale: 100
        },
        monthly: {
            address: 0x330E,
            type: 3,
            length: 2,
            scale: 100
        },
        annual: {
            address: 0x3310,
            type: 3,
            length: 2,
            scale: 100
        },
        total: {
            address: 0x3312,
            type: 3,
            length: 2,
            scale: 100
        },
        maxvolt: {
            address: 0x3300,
            type: 3,
            length: 2,
            scale: 100
        },
        minvolt: {
            address: 0x3301,
            type: 3,
            length: 2,
            scale: 100
        },
    },
    energyConsumption: {
        power: {
            address: 0x310E,
            type: 3,
            length: 2,
            scale: 100
        },
        voltage: {
            address: 0x310C,
            type: 3,
            length: 1,
            scale: 100
        },
        current: {
            address: 0x310D,
            type: 3,
            length: 1,
            scale: 100
        },
        daily: {
            address: 0x3304,
            type: 3,
            length: 2,
            scale: 100
        },
        monthly: {
            address: 0x3306,
            type: 3,
            length: 2,
            scale: 100
        },
        annual: {
            address: 0x3308,
            type: 3,
            length: 2,
            scale: 100
        },
        total: {
            address: 0x330A,
            type: 3,
            length: 2,
            scale: 100
        }
    }
};

export const writeRegisters = {
    charging: {
        address: 0x0,
        type: 2,
        length: 1
    },
    discharging: {
        address: 0x2,
        type: 2,
        length: 1
    },
};
