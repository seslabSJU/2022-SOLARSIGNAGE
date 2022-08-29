
module.exports = {
    
    "port" : "19998",

    "MobiusURL":
    {
        "deviceInformation" :
        {
            "deviceType" : "http://203.250.148.89:7579/Mobius/Device_1_Sample/deviceInformation/deviceType/latest",
            "deviceName" : "http://203.250.148.89:7579/Mobius/Device_1_Sample/deviceInformation/deviceName/latest",
		    "deviceLocation" : "http://203.250.148.89:7579/Mobius/Device_1_Sample/deviceInformation/deviceLocation/latest"
        },

        "powerGeneration" :
        {
            "amountPerMinute" : "http://203.250.148.89:7579/Mobius/Device_1_Sample/deviceUpdatedData/powerGeneration/amountPerMinute/latest",
            "co2emissions" : "http://203.250.148.89:7579/Mobius/Device_1_Sample/deviceUpdatedData/powerGeneration/co2emissions/latest",
            "powerGenerationYesterday" : "http://203.250.148.89:7579/Mobius/Device_1_Sample/deviceUpdatedData/powerGeneration/yesterday/latest",
            "powerGenerationTotal" : "http://203.250.148.89:7579/Mobius/Device_1_Sample/deviceUpdatedData/powerGeneration/total/latest"
        },

        "consumption" : {
            "amountPerMinute" : "http://203.250.148.89:7579/Mobius/Device_1_Sample/deviceUpdatedData/consumption/amountPerMinute/latest",
            "consumptionTotal" : "http://203.250.148.89:7579/Mobius/Device_1_Sample/deviceUpdatedData/consumption/total/latest",
            "consumptionYesterday" : "http://203.250.148.89:7579/Mobius/Device_1_Sample/deviceUpdatedData/consumption/yesterday/latest"
        },

        "battery" : {
            "currentAmount" : "http://203.250.148.89:7579/Mobius/Device_1_Sample/deviceUpdatedData/bateryLevel/currentAmount/latest",
            "maxAmount" : "http://203.250.148.89:7579/Mobius/Device_1_Sample/deviceUpdatedData/bateryLevel/maxAmount/latest"
        },

        "warningAddress" : "http://203.250.148.89:7579/Mobius/Device_1_Sample/deviceUpdatedData/warning/latest"
		
    },

    "requestHeader" :{
        "Accept" : "application/json",
		"XM2MRI" : "12345",
		"XM2MOrigin" : "S20170717074825768bp2l"	
    }

}