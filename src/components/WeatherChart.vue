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
    Legend,
    LogarithmicScale
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

    console.log(props.hourlyForecast[0]);
    return res;
}

function getLabels() {
    return props.hourlyForecast.map(item => {
        // console.log(item.weather);
        return item.weather[0].description;
    })
}

const data = getData();
const labels = getLabels();

const chartData = ref({
    labels: labels.slice(0, 8),
    datasets: [{
        label: 'temp',
        data: data,
        // clip: 1,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.4
    }],

});

const chartOptions = ref({
    responsive: true,
    // pointRadius: 0,
    scales: {
        y: {
            grid: {
                display: false,
            },
            // display: false,
            // suggestedMin: Math.min(...data)  - 5,
            // suggestedMax: Math.max(...data) + 5,
            // suggestedMin: Math.min(...data.slice(0, 8)) - 5,
            // suggestedMax: Math.max(...data.slice(0, 8)) + 5,
            // min: Math.min(...data.slice(0, 8))  - 5,
            // max: Math.max(...data.slice(0, 8)) + 5,
            border: {
                display: false
            },
            // weight: 10,
            // title: {
            //     text: 'temperature',
            //     align: 'center',
            //     color: 'gray',
            //     display: true,
            //     fontSize: '20px',
            // },
            ticks: {
                // Include a dollar sign in the ticks
                callback: function (value, index, ticks) {
                    return value + '°';
                },
                padding: 5,
                color: 'rgb(235 110 75)',
                stepSize: 5,
            }

        },
        x: {
            grid: {
                // display: false,
                color: 'transparent',
                borderColor: 'red',
                tickColor: 'grey'
            },
            border: {
                color: 'black'
            },
            display: true,
            // https://www.chartjs.org/docs/latest/axes/labelling.html
            // title: {
            //     text: 'discription',
            //     align: 'center',
            //     color: 'orange',
            //     display: true
            // },
            ticks: {
                autoSkip: true,
                maxTicksLimit: 8,
            }
        },
    },
    plugins: {
        legend: {
            display: false
        }

    },
    layout: {
        padding: 5
    }
})

</script>

<template>
    <h2>Hourly forecast</h2>
    <Line
        v-if="hourlyForecast"
        id="my-chart-id"
        :options="chartOptions"
        :data="chartData"
    />
</template>