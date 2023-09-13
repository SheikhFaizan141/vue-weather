<script setup>
import { ref, watchEffect, computed } from 'vue'

const props = defineProps(['lat', 'lon']);
const airQuality = ref(null);
const components = ref({});
const aqiDiscription = ref('');
// const time = ref('');

// const renderSub = {
//     'co': false,
//     'nh3': true,
//     'pm_25': false,
//     'pm10': false,
//     'co': false,
//     'co': false,
//     'co': false,
//     'co': false,
//     'co': false,
// }

const range = {
    1: ['Good', 'green'],
    2: ['Fair', 'green'],
    3: ['Moderate', '#2cbf2c'],
    4: ['Poor', 'orangered'],
    5: ['Very Poor', '#ff2f2f']
}

// const range = new Map([
//     [1, ['Good', 'green']],
//     [2, ['Fair', 'green']],
//     [3, ['Moderate', '#2cbf2c']],
//     [4, ['Poor', 'orangered']],
//     [5, ['Very Poor', '#ff2f2f']],
// ])




watchEffect(async () => {
    const lat = props.lat;
    const lon = props.lon;

    const res = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=d5cf16c9a343a988a0ba9ec47620dc88`);
    const data = await res.json();

    console.log(data);

    airQuality.value = data.list[0].main.aqi;

    // components.value = 
})


// const aqi = computed(() => {
//     const value = range.get(airQuality);
//     console.log(value);
//     return {
//         discription: value[1],
//         color: value[1]
//     }
// })
</script>

<template>

    <h1 v-if="!airQuality">Loading</h1>
    
    <div v-else class="aq-box">
        <hgroup class="aq-heading-box">
            <h2 class="aq-heading">Air Quality Index</h2>
            <p class="aq-heading-info">Published at <time datetime="">7:49 pm</time></p>
        </hgroup>

        <div class="aq-index" :style="{color: range[airQuality][1]}">
            <span class="aq-value">52</span>
            <span class="aq-desc">{{ range[airQuality][0] }}</span>
        </div>

        <div class="aq-particles">
            <p class="aq-particles-dis">Air quality is good. A perfect day for a walk!</p>

            <div class="aq-particles-box">
                <div>
                    <p class="aq-paritcles-value">37.17</p>
                    <p class="aq-paritcles-name">PM2.5</p>
                </div>
                <div>
                    <p class="aq-paritcles-value">37.17</p>
                    <p class="aq-paritcles-name">PM2.5</p>
                </div>
                <div>
                    <p class="aq-paritcles-value">37.17</p>
                    <p class="aq-paritcles-name">PM2.5</p>
                </div>
                <div>
                    <p class="aq-paritcles-value">37.17</p>
                    <p class="aq-paritcles-name">PM2.5</p>
                </div>
                <div>
                    <p class="aq-paritcles-value">37.17</p>
                    <p class="aq-paritcles-name">PM2.5</p>
                </div>
                <div>
                    <p class="aq-paritcles-value">37.17</p>
                    <p class="aq-paritcles-name">PM2.5</p>
                </div>
                <div>
                    <p class="aq-paritcles-value">37.17</p>
                    <p class="aq-paritcles-name">PM2.5</p>
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped>
.aq-box {
    background: #fff;
    padding: .75rem;
    border-radius: 4px;
}

.aq-heading-box {
    margin-block-end: .75rem;
    /* padding: .5rem; */
    border-radius: 3px;
}

/* .aq-heading-box:hover {
    transition: all 400ms ease-in-out;
    background: linear-gradient(45deg, #2e9c18, rgba(255, 255, 255, 0.199), #06ff06);
    box-shadow: 2px 2px 10px black;
} */

.aq-heading {
    font-size: clamp(1rem, 1.5rem + 5vw, 2rem);
    font-weight: 500;
    margin-block-end: .5rem;
}

.aq-heading-info {
    font-size: clamp(1rem, 1rem + 5vw, 1.25rem);
}

/* Index Box */
.aq-index {
    /* border: 1px salmon solid; */
    /* padding: .5rem 0; */
    margin-block-end: 1rem;
}

.aq-value {
    font-size: clamp(1rem, 2rem + 4vw, 4rem);
    margin-inline-end: .75rem;
}

.aq-desc {
    font-size: clamp(1.015rem, 1rem + 5vw, 1.75rem);
    /* align-self:last baseline; */
}

/* 	Pollutant concentration */
/* .aq-particles {
    
} */

.aq-particles-dis {
    font-size: 1.25rem;
    margin-block-end: 0.5rem;
}

.aq-particles-box {
    display: flex;
    column-gap: 0.35rem;
    padding-block: .5rem;
    overflow-x: auto;
    scroll-snap-type: mandatory;

}

.aq-particles-box>div {
    font-size: 1.25rem;
    text-align: center;


    /* box-shadow: 0 0 10px gray; */
    /* border-radius: 3px; */

    padding-inline: 0.5rem;
    padding-block: 0.25rem;
    flex: 1;
    border-radius: 3px;
}

.aq-particles-box>div:nth-of-type(even) {
    background-color: rgb(26, 26, 26);
    color: #fff;
}

.aq-paritcles-value {
    margin-block-end: .25rem;
    /* border: 1px solid black; */
}

.aq-paritcles-name {
    font-size: smaller;
    color: #585858;
}

/* .aq-paritcles-name:nth-child(even) {
    color: #ffffff;
} */</style>