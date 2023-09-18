<script setup>

import IconHumidity from './icons/IconHumidity.vue';
import IconWind from './icons/IconWind.vue';
import IconPressure from './icons/IconPressure.vue';
import IconUv from './icons/IconUv.vue';

const props = defineProps([
    'humidity',
    'windSpeed',
    'pressure',
    'uv',
]);


const items = [{
    name: 'Humidity',
    icon: ''
},
{
    name: 'Wind Speed',
    icon: ''
},
{
    name: 'Pressure',
    icon: ''
},
{
    name: 'UV index',
    icon: ''
}]

// console.log(props.info);

</script>

<template>
    <div class="cw-add-info">

        <div class="add-box">
            <p class="add-heading ">Humidity</p>
            <p class="add-value"><i class="icon add-icon"><IconHumidity/></i> 30%</p>
        </div>
        <div class="add-box">
            <p class="add-heading ">Wind Speed</p>
            <p class="add-value"><i class="icon add-icon"><IconWind /></i> {{ windSpeed }} km/h</p>
        </div>
        <div class="add-box">
            <p class="add-heading ">Pressure</p>
            <p class="add-value"><i class="icon add-icon"><IconPressure /></i> {{ pressure }} hPa</p>
        </div>
        <div class="add-box">
            <p class="add-heading ">UV Index</p>
            <p class="add-value"><i class="icon add-icon"><IconUv /></i> {{ uv }}</p>
        </div>
    </div>
</template>

<style scoped>
/* Additional */
.cw-add-info {
    background-color: #0f0f0f;
    color: #fff;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    align-items: center;
    padding: .75rem;
    border-radius: 4px;
    grid-column: 3/4;
    gap: 1rem 0.75rem;
}

.cw-add-info:hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 15px 15px;
    transform: translateY(-10px) rotate(4deg);
    transition: transform 750ms ease-in-out;
}

.add-heading {
    color: #949494;
    text-transform: uppercase;
    font-size: 1.05rem;
    margin-block-end: .5rem;
}

.add-value {
    color: #c5c5c5;
    font-weight: 500;
    font-size: 1.015rem;
}

/* Add icons */
.icon {
    display: inline-block;
    width: 1.5rem;
    height: auto;
    color: rgb(255, 255, 255);
    margin-inline-end: .25rem;
}

.icon svg {
    fill: rgb(255, 255, 255);
    width: 100%;
    height: 100%;
}

</style>

