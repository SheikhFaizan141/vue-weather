<script setup>
const props = defineProps(['tzOffset', 'hourlyForecast', 'unit']);

import { ref, watchEffect } from 'vue';
import { Line } from 'vue-chartjs'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { formatUnit } from '../global/utils';

ChartJS.register(Title, Tooltip, Legend, PointElement, LineElement, CategoryScale, LinearScale)

// watchEffect(async () => {

// })

// const labels = Utils.months({count: 7});
// export default {
//     name: 'WeatherChart',
//     components: { Line },
//     data() {
//         return {
//             chartData: {
//                 labels: ['January', 'February', 'March'],
//                 datasets: [{
//                     label: 'My First Dataset',
//                     data: [65, 59, 80, 81, 56, 55, 40],
//                     fill: false,
//                     borderColor: 'rgb(75, 192, 192)',
//                     tension: 0.1
//                 }]
//             },
//             chartOptions: {
//                 responsive: true
//             }
//         }
//     }
// }




function time(value) {
    let res = new Date((value) * 1000);

    console.log(res);
}



// function getChartData() {
//     let result = new Map();

//     let labels = [];
//     let data = [];

//     for (let i = 0; i < 8; i++) {
//         const element = array[i];

//     }
// }


function getData() {
    let res = props.hourlyForecast.map(item => {

        return formatUnit(item['temp'], props.unit);
    })

    return res;
}

function getLabels() {
    return props.hourlyForecast.map(item => {
        console.log(item.weather);
        return item.weather[0].description;
    })
}

const data = getData();
const labels = getLabels();

const chartData = ref({
    labels: labels,
    datasets: [{
        label: 'faf',
        data: data,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.2
    }]
});

const chartOptions = ref({
    responsive: true,
    pointRadius: 0,
    scales: {
            y: {
                grid: {
                    display: false
                },
                // displa
                suggestedMin: Math.min(...data)  - 5,
                suggestedMax: Math.max(...data) + 5
            },
            x: {
                grid: {
                    display: false
                },
                display: true
            }
        }

})

</script>

<template>
    <h1>Hourly Weather</h1>
    <Line
        v-if="hourlyForecast"
        id="my-chart-id"
        :options="chartOptions"
        :data="chartData"
    />
</template>