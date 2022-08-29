<template>
    
    <div class="row">
        <div class="mb-5 col-md-12">
            <h1><span class="badge badge-info">Device Dashboard</span></h1>
        </div>

        <div class="card col-md-12">
                <div class="card-header">
                    <strong><h3>Connected Devices Total : <span class="badge badge-secondary">{{result}}</span></h3></strong>
                </div>
        </div>

        <ChoosingDeviceInfo
                    
             v-for="device in deviceInfo" :key="device.deviceId"
            :title="device.deviceName"
            :deviceID="device.deviceId"
            icon="icon-lg pe-7f-monitor"
            bgclass="bg-flat-color-1"
            :counter="device.deviceLocation"
        > 
        </ChoosingDeviceInfo>

        <!-- <ChoosingDeviceInfo/> -->
    </div>

</template>

<script>


import ChoosingDeviceInfo from './ChoosingDeviceInfo/ChoosingDeviceInfo.vue';

import axios from 'axios';
//import VueAxios from 'vue-axios';


export default{
    name: 'choosingDevice',
    //el : '#choosingDeviceTemplate',
   
    data(){
        return{
            result : 0,
            deviceInfo : {}
        }
    },
    
    methods: {
    doSomething: function () {
      const url = "http://127.0.0.1:19999?request=999999"
      
      var config= { method: 'GET',
                    //
                    headers: {
                        'Access-Control-Allow-Origin': 'http://lee.crayola.ga',
                        'Content-Type': 'application/json',
                    },
                   //withCredentials: false,
                   //credentials: 'same-origin'
                  }
      //var myself = this

      axios.get(url)
       
       .then(({data}) => {
         console.log("data = ", data)
         console.log("json result = ", data.result)
            
            if(data.result != 0){
                console.log("Data is not empty!")
                this.deviceInfo = data.deviceInfo
                this.result = data.connectedDeviceTotal;
                console.log("json data = ", this.deviceInfo)
            }
            else{
                console.log("Data is Null!");
            }
         })
        
        }
    },

    components: {
        
        ChoosingDeviceInfo
    },

    mounted: function(){
        this.doSomething()

    }

    
    
   
}


</script>

<style>

</style>