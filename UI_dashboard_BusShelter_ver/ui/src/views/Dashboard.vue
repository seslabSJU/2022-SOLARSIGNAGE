<template>

    <div class="row">
<div class="col-xs-6 row col-sm-12 ml-0 mr-0" style="background-color: white">
	<DI
           :lat="devicelat"
           :long="devicelong"
           :name = "devicename"
            title="Device Information">
        </DI>
</div>
<div class="mt-10">
&nbsp; 
</div>
<div class="col-xs-6 row col-sm-12 ml-0 mr-0 mt-2" style="background-color: white">
	<Battery
            title="Battery Status"
            :power="battPower"
            :current="battCurrent"
            :voltage="battVoltage"
            :level="battLevel"
            :updatedTime="batteryTime"
            v-on:charging="listenToCharging($event)"
            v-on:discharging="listenToDischarging($event)">
        </Battery>

	<BatteryVolt
        :maxvolt ="battMaxvolt"
        :minvolt = "battMinvolt"
        :updatedTime="batteryTime"
        title="Battery Voltage Today">
        </BatteryVolt>
&nbsp;
	<BatteryLevel
        :updatedTime="batteryTime"
        :level="battLevel">
        </BatteryLevel>

        <BatteryTemp
        :temperature ="battTemp"
        :updatedTime="batteryTime"
        title="Battery Temperature">
        </BatteryTemp>
</div>
<div class="mt-10">
&nbsp;
</div>
<div class="row col-xs-6 col-sm-12 ml-0 mr-0 mt-1" style="background-color: white">
	<RealTime :realTimeValue ="solarPower" label= "Solar Power : " title="Energy Generation" valueCanvasId = "flotRealtime" :updatedTime="solarTime"/>
	<div class="col col-xs-6 col-sm-6 mr-0" style="background-color: white">
	<SolarLoad
            title="Energy Generation"
            :power="solarPower"
            :current="solarCurrent"
            :voltage="solarVoltage"
            :daily="solarDaily"
            :monthly="solarMonthly"
            :annual="solarAnnual"
            :total="solarTotal"
            :updatedTime="solarTime">
        </SolarLoad>
	<!--<div class="row col-xs-6 col-sm-6 mr-0" style="background-color: white">-->
	<SolarVolt
        :maxvolt ="solarMaxvolt"
        :minvolt = "solarMinvolt"
        :updatedTime="solarTime"
        title="Generation Voltage Today">
        </SolarVolt>
	</div>
</div>
<div class="mt-10">
&nbsp;
</div>
<div class="row col-xs-6 row col-sm-12 ml-0 mr-0 mt-1" style="background-color: white">
	<RealTime2 :realTimeValue ="loadPower" label= "Load Power : " title="Energy Consumption" valueCanvasId= "flotRealtime2" :updatedTime="loadTime"/>
<div class="col col-xs-6 col-sm-6 mr-0" style="background-color: white">
	<SolarLoad
            title="Energy Consumption"
            :power="loadPower"
            :current="loadCurrent"
            :voltage="loadVoltage"
            :daily="loadDaily"
            :monthly="loadMonthly"
            :annual="loadAnnual"
            :total="loadTotal"
            :updatedTime="loadTime">
        </SolarLoad>
</div>
</div>
</div>

        <!-- <DeviceInfo
            title="Device Name"
            icon="icon-lg pe-7f-comment"
            bgclass="bg-flat-color-1"
            :counter="deviceName"
            :weather = true
        >
        </DeviceInfo> -->
        
        <!-- <DeviceInfo
            icon="icon-lg pe-7f-info"
            bgclass="bg-flat-color-1"
            :counter="deviceType"
            title="Device Type"
        >
        </DeviceInfo>

        <DeviceInfo
            icon="icon-lg pe-7f-map-marker"
            bgclass="bg-flat-color-1"
            :counter="deviceLocation"
            title="Device Location"
        >
        </DeviceInfo> 
        
        <SolarLoad 
            title="Energy Generation" 
            :power="solarPower" 
            :current="solarCurrent"
            :voltage="solarVoltage"
            :daily="solarDaily"
            :monthly="solarMonthly"
            :annual="solarAnnual"
            :total="solarTotal"
            :updatedTime="solarTime">
        </SolarLoad>-->

        

	<!--<Battery
            title="Battery Status"
            :power="battPower" 
            :current="battCurrent"
            :voltage="battVoltage"
            :level="battLevel"
            :updatedTime="batteryTime"
            v-on:charging="listenToCharging($event)"
            v-on:discharging="listenToDischarging($event)"> 
        </Battery>

        <SolarLoad
            title="Energy Consumption"
            :power="loadPower" 
            :current="loadCurrent"
            :voltage="loadVoltage"
            :daily="loadDaily"
            :monthly="loadMonthly"
            :annual="loadAnnual"
            :total="loadTotal"
            :updatedTime="loadTime"> 
        </SolarLoad>-->
        
       
         <!-- <div class = "small">
                             <line-chart-js
                                 :dataChart ="dataChartSolar" 
                                 theBackgroundColor = "rgb(89, 165, 89)"
                                 :labelsData ="dataLabelSolar"/>
                      </div> -->

        <!--
        <PowerGeneration title = "Solar" bgColour = "rgb(89, 165, 89)" v-bind:theDataChart ="dataChartSolar" :labelsData="dataLabelSolar" :power="solarPower"/> 
        <PowerGeneration title = "Power" bgColour = "rgba(0, 123, 255, 0.5)" :theDataChart ="dataChartPower" :labelsData="dataLabelPower"/> 

        
        <PowerGeneration title = "Solar" bgColour = "rgb(89, 165, 89)" :valueChart ="solarPower" :idxChart="idxPowerSolar" :timeChart="timePowerSolar"/>
        <PowerGeneration title = "Power" bgColour = "rgba(0, 123, 255, 0.5)" :valueChart ="loadPower" :idxChart="idxPowerLoad" :timeChart="timePowerLoad"/>
        
        <RealTime :realTimeValue ="solarPower" label= "Solar Power : " title="Energy Generation" valueCanvasId = "flotRealtime" :updatedTime="solarTime"/>
        <RealTime2 :realTimeValue ="loadPower" label= "Load Power : " title="Energy Consumption" valueCanvasId= "flotRealtime2" :updatedTime="loadTime"/>-->

        <!--<DI
           :lat="devicelat"
           :long="devicelong"
           :name = "devicename"
            title="Device Information">  
        </DI>

        <SolarVolt
        :maxvolt ="solarMaxvolt"
        :minvolt = "solarMinvolt"
        :updatedTime="solarTime"
        title="Generation Voltage Today">
        </SolarVolt>-->

        

        <!--<Efficiency
            title="Generation Efficiency"> 
        </Efficiency> 
        
        <Consumption />-->
        <!--<BatteryVolt
        :maxvolt ="battMaxvolt"
        :minvolt = "battMinvolt"
        :updatedTime="batteryTime"
        title="Battery Voltage Today">
        </BatteryVolt>

        <OperationalTime 
            :time = "devicestarttime"
            title = "Operational Time">
         </OperationalTime>


        <BatteryLevel
        :updatedTime="batteryTime"
        :level="battLevel">
        </BatteryLevel>

        <BatteryTemp
        :temperature ="battTemp"
        :updatedTime="batteryTime"
        title="Battery Temperature">
        </BatteryTemp>-->
        
        

    </div>

</template>

<!-- <script src="/socket.io/socket.io.js"></script> -->
<script>

/*import DeviceInfo from './dashboard/dashboardcomponent/DeviceInfo.vue';*/
import {UI_SOCKET_URL, PUSH_CHARGING_URL, PUSH_DISCHARGING_URL} from './../../config.js'
import DropdownMenu from './dashboard/dashboardcomponent/dropdown.vue';
import PowerGeneration from './dashboard/dashboardcomponent/PowerGeneration.vue';
import Consumption from './dashboard/dashboardcomponent/Consumption.vue';
import BatteryLevel from './dashboard/dashboardcomponent/BatteryLevel.vue';
import OperationalTime from './dashboard/dashboardcomponent/OperationalTime.vue';
import BatteryVolt from './dashboard/dashboardcomponent/BatteryVolt.vue';
import BatteryTemp from './dashboard/dashboardcomponent/BatteryTemp.vue';
import SolarVolt from './dashboard/dashboardcomponent/SolarVolt.vue';

import LEDStatus from './components/LEDStatus.vue';
import InverterStatus from './components/InverterStatus.vue';
/*import Warning from './dashboard/dashboardcomponent/Warningdashboard/dashboardcomponent/.vue';*/
import SolarLoad from './dashboard/dashboardcomponent/solarload.vue';
import Battery from './dashboard/dashboardcomponent/battery.vue';
import LineChartJs from './dashboard/dashboardcomponent/subcharts/LineChartJConsumption.vue';
import RealTime from './dashboard/dashboardcomponent/RealTime.vue';
import RealTime2 from './dashboard/dashboardcomponent/RealTime2.vue';
import io from 'socket.io-client';
import Efficiency from './dashboard/dashboardcomponent/efficiency.vue'
import DI from './dashboard/dashboardcomponent/DeviceInfo.vue';
import axios from 'axios';


//const socket = io('http://52.79.110.246:19997');
const socket = io(UI_SOCKET_URL);

export default{
    
    name: 'dashboard',
    props: ['requestType'],

    data: function(){
        return{
            deviceName: "", deviceType: "", deviceLocation: "",
            
           
            solarPower : "0",
            solarCurrent : "0",
            solarVoltage : "0",
            solarAnnual : "0",
            solarDaily : "0",
            solarMonthly : "0",
            solarTotal: "0",

            loadPower : "0",
            loadCurrent : "0",
            loadVoltage : "0",
            loadAnnual : "0",
            loadDaily : "0",
            loadMonthly : "0",
            loadTotal : "0",

            battPower: "0", 
            battCurrent: "0",
            battVoltage:"0",
            battLevel:"0",
            charging : "No Status",
            discharging : "No Status",

            battMaxvolt : "0",
            battMinvolt : "0",
            battTemp : "0",

            solarMaxvolt : "0",
            solarMinvolt : "0",
            
            idxPowerSolar: 0,
            idxPowerLoad: 0,
            timePowerSolar: "",
            timePowerLoad: "",
            /*solarTime: " yyyy:mm:dd 00:00:00:000",
            batteryTime: " yyyy:mm:dd 00:00:00:000",
            loadTime: " yyyy:mm:dd 00:00:00:000"*/
            solarTime: "",
            batteryTime: "",
            loadTime: "",

            devicename : "",
            devicelat : "",
            devicelong : "",
            devicestarttime : ""

        }
    },
   
    methods: {

        setNewSelectedOption(selectedOption) {
            this.config.placeholder = selectedOption.value;
        },
        
        getCurrentTime: function(){
	
          var today = new Date();
          var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
          var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
          var dateTime = date+' '+time;

          return dateTime;
        },

        pushCharging: function(uri, data){
          
            axios.post(uri, {"command" : data},   { 
                    headers :{
                         'Access-Control-Allow-Origin': '*'
                            /*"Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"*/

                    } })
                .then(function (response) {

                   console.log("Response from server -> "+response);

                })
                .catch(function (error) {

                     console.log("Error from server -> "+error);

                });
        },

       
       
        showSidebar: function(){
            this.$emit("showSidebar", true);
        },

        listenToServer : function(){

            // Solar Listener
            socket.on('solarCurrent', (data)=>{
                this.solarCurrent = data;
                console.log("Solar Current = "+data);
            });

            socket.on('solarPower', (data)=>{ 
                this.solarPower = data;
                this.idxPowerSolar = localStorage.idxSolar;
                this.timePowerSolar = this.getCurrentTime();

                console.log("Solar Power = "+data+" || Time = "+this.timePowerSolar+" || idx = "+this.idxPowerSolar);
    
                /*if(localStorage.idxSolar == 5){
                    localStorage.idxSolar = 0;
                }else{
                    localStorage.idxSolar++;
                }*/

            });
            
            socket.on('solarVoltage', (data)=>{ 
                this.deviceType = data;
                this.solarVoltage = data
                console.log("Device Type = "+data);
                });
            
            socket.on('solarAnnual', (data)=>{
                this.solarAnnual = data;
                console.log("Solar Annual = "+data);
            });

            socket.on('solarDaily', (data)=>{
                this.solarDaily = data;
                console.log("Solar Daily = "+data);
            });

            socket.on('solarMonthly', (data)=>{
                this.solarMonthly = data;
                console.log("Solar Monthly = "+data);
            });

            socket.on('solarAnnual', (data)=>{
                this.solarAnnual = data;
                console.log("Solar Annual = "+data);
            });

            socket.on('solarTotal', (data)=>{
                this.solarTotal = data;
                console.log("Solar total = "+data);
            });

            socket.on('solarTime', (data)=>{
                this.solarTime = data;
                console.log("Solar Time = "+data);
            });

            //Load Listener

            socket.on('loadCurrent', (data)=>{
                            this.loadCurrent = data;
                            console.log("Load Current = "+data);
                });

                socket.on('loadVoltage', (data)=>{
                            this.loadVoltage = data;
                            console.log("Load Voltage = "+data);
                });

                socket.on('loadPower', (data)=>{
                
                        this.loadPower = data;
                        this.idxPowerLoad = localStorage.idxLoad;
                        this.timePowerLoad = this.getCurrentTime();

                        console.log("Load Power = "+this.loadPower+" || Time = "+this.timePowerLoad+" || idx = "+this.idxPowerLoad);
            
                    
                        /*if(localStorage.idxLoad == 5){
                            localStorage.idxLoad = 0;
                        }else{
                            localStorage.idxLoad++;
                        }*/
                
                });

                socket.on('loadDaily', (data)=>{
                            this.loadDaily = data;
                            console.log("Load Daily = "+data);
                });
                socket.on('loadMonthly', (data)=>{
                            this.loadMonthly = data;
                            console.log("Load Monthly = "+data);
                });

                socket.on('loadAnnual', (data)=>{
                            this.loadAnnual = data;
                            console.log("Load Annual = "+data);
                });

                socket.on('loadTotal', (data)=>{
                            this.loadTotal = data;
                            console.log("Load Total = "+data);
                });

                socket.on('loadTime', (data)=>{
                            this.loadTime = data;
                            console.log("Load Time = "+data);
                });
            
            //battery listener

                socket.on('battLevel', (data)=>{
                    this.battLevel= data;
                    console.log("Battery Level = "+data);
                });

                socket.on('battCurrent', (data)=>{
                    this.battCurrent= data;
                    console.log("Battery Current = "+data);
                });

                socket.on('battVoltage', (data)=>{
                    this.battVoltage= data;
                    console.log("Battery Voltage = "+data);
                });
                socket.on('battPower', (data)=>{
                    this.battPower= data;
                    console.log("Battery Power = "+data);
                });

                socket.on('batteryTime', (data)=>{
                    this.batteryTime= data;
                    console.log("Updated Time = "+data);
                });
                
                socket.on('charging', (data)=>{
                    this.charging= data;
                    console.log("Battery Charging = "+data);
                });

                socket.on('discharging', (data)=>{
                    this.discharging= data;
                    console.log("Battery Discharging = "+data);
                });

                socket.on('battMaxvolt', (data)=>{
                    this.battMaxvolt= data;
                    console.log("BatterybattMaxvolt = "+data);
                });
                
                socket.on('battMinvolt', (data)=>{
                    this.battMinvolt= data;
                    console.log("Battery battMinvolt = "+data);
                });

                socket.on('battTemp', (data)=>{
                    this.battTemp= data;
                    console.log("Battery battTemp = "+data);
                });

                socket.on('solarMaxvolt', (data)=>{
                    this.solarMaxvolt= data;
                    console.log("Solar solarMaxvolt = "+data);
                });
                
                socket.on('solarMinvolt', (data)=>{
                    this.solarMinvolt= data;
                    console.log("Solar solarMaxvolt = "+data);
                });

                //add device info listener
                socket.on('deviceName', (data)=>{
                    this.devicename= data;
                    console.log("DeviceInfo deviceName = "+data);
                });

                socket.on('deviceLat', (data)=>{
                    this.devicelat= data;
                    console.log("DeviceInfo deviceLat = "+data);
                });

                socket.on('deviceLong', (data)=>{
                    this.devicelong= data;
                    console.log("DeviceInfo deviceLong = "+data);
                });

                socket.on('deviceStartTime', (data)=>{
                    this.devicestarttime= data;
                    console.log("DeviceInfo starttime = "+data);
                });
                //add device info listener

        },



        //listen to event

        listenToCharging : function(data){
            console.log("listenTocharging in Dashvoard.vue");
            this.pushCharging(PUSH_CHARGING_URL, data);
        },

        listenToDischarging : function(data){
            
            this.pushCharging(PUSH_DISCHARGING_URL, data);
          
        }

    },

    
    components: {
        
     
        //DeviceInfo,
        //DropdownMenu,
        PowerGeneration,
        Consumption,
        BatteryLevel,
        OperationalTime,
        BatteryVolt,
        BatteryTemp,
        SolarVolt,
        
        /*Warning,*/
        SolarLoad,
        Battery,
        RealTime,
        RealTime2,
        Efficiency,
        DI,
	LEDStatus,
        InverterStatus
    },

   /* watch:{
        onChildClick(value){
            console.log("value dari switch button --> "+value);
        }
    },*/

    mounted: function(){
        localStorage.idxSolar = 0;
        localStorage.idxLoad = 0;
        
        this.listenToServer();
       
    }
   
   
}



</script>

<style>
   
</style>
