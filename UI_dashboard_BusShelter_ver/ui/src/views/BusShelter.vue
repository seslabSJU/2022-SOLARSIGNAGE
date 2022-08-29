<template>
    <div class="row">
        <LEDStatus
        title="LED Light 1 Status"
        :led_num="1"
        :updatedTime="led1Time"
        v-on:off="listenToLED1off"
        v-on:on="listenToLED1on">
        </LEDStatus>

        <LEDStatus
        title="LED Light 2 Status"
        :led_num="2"
        :updatedTime="led2Time"
        v-on:off="listenToLED2off"
        v-on:on="listenToLED2on">
        </LEDStatus>

        <InverterStatus
        title="Inverter Status"
        :updatedTime="InverterTime"
        v-on:off="listenToInverterOff"
        v-on:on="listenToInverterOn">
        </InverterStatus>

    <div class="col-xs-2 col-sm-4 ml-0 mr-0">
        <div class="card">
            <div class="card-top">
                <h3 class="float-left bold"><strong>Awning Status</strong></h3>
            </div>

            <div class="card-body p-0 pt-2 pb-2">
                <div class="row">
                    <div class="col-md-4">
                        <div class="item text-left">
                            <h5 class="m-1 pb-10"><small>Awning</small></h5>
                        </div>
                    </div>
                    <div class="col-md-5 pb-10 mb-4">
                        <button v-on:click="listenToAwningOpen">Open</button>
                        <button v-on:click="listenToAwningClose">Close</button>
                        <button v-on:click="listenToAwningStop">Stop</button>
                    </div>
                </div>
		<div class="row mb-0">
                    <div class="col-md-10">
                        <div class="item text-center mb-0">
                            <span class="badge badge-dark ml-5">Last Updated : {{ awningStatus }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
<div class="col-xs-2 col-sm-4 ml-0 mr-0">
        <div class="card">
            <div class="card-top">
                
                   <img src="src/images/battery.png" alt="" height="25" width="25" class="float-left mr-2">
                    <h3 class="float-left bold"> <strong> LOAD Charged Energy</strong></h3>
                            
            </div><!-- /.card-top -->
            <!-- <div class="card-body p-0 pt-4 pb-4 download-chart"> -->

            
            <div class="card-body p-0 pt-2 pb-2">   
                  <div class="row" >
                        <div class="col-md-2">
                            <div>
                                <img src="src/images/discharging.png" alt="" height="25" width="25" class="float-right">
                            </div>
                        </div> 
                        <div class="col-md-4">
                             <div class="item text-left">
                                <h5 class="m-1 pb-10"><small>Charged energy</small></h5> 
                            </div>
                        </div> 
                        <div class="col-md-5 pb-10 mb-4">
                          
                                <h5 class="m-1 pb-10"><small><switchbutton v-model="switch2"></switchbutton></small></h5>
                            
                        </div>
                  </div>
                  <div class="row mb-0">
                        <div class="col-md-10">
                            <div class="item text-center mb-0">
                                 <!-- <h6 class="ml-5"><small>Last Updated : </small></span></h6> -->
                                  <span class="badge badge-dark ml-5">Last Updated : {{updatedTime}}</span>
                            </div>
                        </div>
                  </div>

                 
                  
                 </div>   
                 

            </div>

            
                 
            <div class="card-footer bg-white br-0 pl-5 pr-5 pt-0 pb-0">

                   

            </div>
        </div>
    </div>

                 
</template>

<script>
import { UI_SOCKET_URL, PUSH_LED1_URL, PUSH_LED2_URL, PUSH_AWNING_URL, PUSH_INVERTER_URL } from '../../config';
import LEDStatus from './components/LEDStatus.vue';
import InverterStatus from './components/InverterStatus.vue';
import switchbutton from './dashboard/dashboardcomponent/switch-button.vue';
import io from 'socket.io-client';
import axios from 'axios';


const socket = io(UI_SOCKET_URL);

export default {
    name: 'busshelter',
    props: ['requestType'],

    data: function() {
        return {
            led1Status: false,
            led2Status: false,
            awningStatus: "Closed",
            InverterStatus: false,

            led1Time: "",
            led2Time: "",
            InverterTime: ""
        }
    },

    methods: {
        getCurrentTime: function() {
            var today = new Date();
            var date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date + ' ' + time;

            return dateTime
        },

        pushCharging: function(uri, data) {
            axios.post(uri, {"command": data}, {
                headers : {
                    'Access-Control-Allow-Oirigin': '*'
                } }).then(function (response) {
                    console.log("Response from server -> " + response);
                }).catch(function (error) {
                    console.log("Error from server -> " + error);
                });
        },

        listenToLED1on: function() {
            this.pushCharging(PUSH_LED1_URL, 'on');
        },

        listenToLED1off: function() {
            this.pushCharging(PUSH_LED1_URL, 'off');
        },

        listenToLED2on: function() {
            this.pushCharging(PUSH_LED2_URL, 'on');
        },

        listenToLED2off: function() {
            this.pushCharging(PUSH_LED2_URL, 'off');
        },

        listenToAwningOpen: function() {
            this.awningStatus = "Open";
	    this.pushCharging(PUSH_AWNING_URL, 'open');
        },

        listenToAwningClose: function() {
	    this.awningStatus = "Closed";
            this.pushCharging(PUSH_AWNING_URL, 'close');
        },

        listenToAwningStop: function() {
	    this.awningStatus = "Stoped"
            this.pushCharging(PUSH_AWNING_URL, 'stop');
        },

        listenToInverterOn: function() {
            this.pushCharging(PUSH_INVERTER_URL, 'on');
        },

        listenToInverterOff: function() {
            this.pushCharging(PUSH_INVERTER_URL, 'off');
        },

        listenToDischarging : function(data){
            
            this.pushCharging(PUSH_DISCHARGING_URL, data);
          
        }
    },

    components: {
        LEDStatus,
        InverterStatus,
	    switchbutton
    },
    watch :{
	switch2 : function(value){
                this.updatedTime = this.getCurrentTime();
                if(value){
                  
                    console.log("Discharging on");
                    this.$emit('discharging', 1);
                }
                else{
                     console.log("Discharging off");
                     this.$emit('discharging', 0);
                   
                }
                
            }
    }
}
</script>
