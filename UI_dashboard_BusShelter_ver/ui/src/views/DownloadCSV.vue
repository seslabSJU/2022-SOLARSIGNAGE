<template>
<div>
    <div class>
        날짜 형식: YYYY-DD-MM (예시: 2022-07-01)<br>
        데이터 형식: battery.csv generation.csv consumption.csv batteryData.csv<br>
        <input v-model="date"><br>
        <input v-model="dtype"><br>
        <button @click="download">CSV 다운로드</button>
    </div>

</div>
</template>

<script>
import axios from 'axios';
import LineChartJs from './dashboard/dashboardcomponent/subcharts/LineChartJConsumption.vue';
import PowerGeneration from './dashboard/dashboardcomponent/PowerGeneration.vue';
import Vue from 'vue';


    export default {
        name: 'download',
        data: () => ({
            date: '2022-08-01',
            dtype: 'battery.csv'
        }),
        methods: {
            async download() {
                const { date } = this;
                const { dtype } = this;
                axios({
                    url: `http://34.64.223.100:19999/csv/${date}/${dtype}`,
                    method: 'GET',
                    responseType: 'blob'
                }).then((response) => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', `${date}_${dtype}`);
                    document.body.appendChild(link);
                    link.click();
                    documment.body.removeChild(link);
                })
            }
        },
    }
</script>
