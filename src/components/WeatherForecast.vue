<script setup>
import { ref } from 'vue';

const props = defineProps(['forecast', 'timeOffset', 'scale']);

const emit = defineEmits(['onClick']);

const selected = ref(null);


function getDay(time, offset) {
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const day = new Date((time + offset) * 1000).getDay();
    return days[day]
}

function formatUnit(temp) {
    const value = props.scale === 'c' ? temp - 273.15 : (1.8 * (temp - 273.15) + 32);
    return Math.round(value);
}

function handleSelect(item, index) {
    

    emit('onClick', item);
    selected.value = index;
}



</script>

<template>
     <!-- <h2>Weather Forecast</h2> -->
    <div class="wf-box">
       
        <div 
         class="wf-info" 
         :key="item['dt']" 
         v-for="(item, index) in forecast"
         @click="() => handleSelect(item, index)"
         :class="selected === index ? 'wf-selected' : ''"
        >
            <h4 class="wf-day">{{ getDay(item['dt'], props.timeOffset) }}</h4>
            <div class="res-img">
                <img width="50" height="50" :src="`https://openweathermap.org/img/wn/${item['weather'][0]['icon']}@2x.png`" alt="">
            </div>
            
            <div class="wf-temp">
                <span title="max temp" class="wf-max-temp">{{ formatUnit(item['temp']['max']) }}°</span>
                <span class="wf-min-temp">{{formatUnit(item['temp']['min'])}}°</span>
            </div>
        </div>
   
   </div>
</template>

<style scoped>
.wf-box {
    display: flex;
    justify-content: space-between;
    background-color: white;
    column-gap: .5rem;
    padding: .75rem;
    text-align: center;
    overflow-x: auto;
    /* scroll-behavior:smooth; */
}

.wf-info {
    padding: .5rem;
    flex: 1 1 100px;
}

.wf-info:hover {
    background-color: #5a5a5a;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
}
.wf-info:hover .wf-temp {
    color: #fff;
}


.wf-day {
    font-size: 1.25rem;
    font-weight: 500;
    margin-block-end: .5rem;
}

.wf-temp {
    margin-block-start: .5rem;
    font-size: 1.15rem;
    color: #3d3d3d;
}

.wf-max-temp {
    margin-inline-end: 0.5rem;
}

.wf-selected {
    background-color: #5e5e5e;
    color: #fff;
}
.wf-selected .wf-temp{
    color: #fff;
}
</style>