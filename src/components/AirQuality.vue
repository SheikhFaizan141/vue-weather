<script setup>
import { ref, watchEffect, computed } from 'vue'

const props = defineProps(['lat', 'lon']);
const airQuality = ref(null);
const components = ref({});
const aqiDiscription = ref('');
// const time = ref('');

const renderSub = {
    'co': { name: 'co', sub: '' },
    'no': { name: 'no', sub: '' },
    'no2': { name: 'no', sub: '2' },
    'o3': { name: 'o', sub: '3' },
    'so2': { name: 'so', sub: '2' },
    'pm2_5': { name: 'pm 2.5', sub: '' },
    'pm10': { name: 'pm 10', sub: '' },
    'nh3': { name: 'nh', sub: '3' },
}

const range = new Map([
    [1, ['Good', 'green']],
    [2, ['Fair', 'green']],
    [3, ['Moderate', '#2cbf2c']],
    [4, ['Poor', 'orangered']],
    [5, ['Very Poor', '#ff2f2f']],
])


watchEffect(async () => {
    const lat = props.lat;
    const lon = props.lon;

    const res = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=d5cf16c9a343a988a0ba9ec47620dc88`);
    const data = await res.json();

    // console.log(data);

    airQuality.value = data.list[0].main.aqi;

    components.value = data.list[0].components;
})

</script>

<template>
    <h1 v-if="!airQuality">Loading</h1>

    <div v-else class="aq-box">
        <hgroup class="aq-heading-box">
            <h2 class="aq-heading">Air Quality Index</h2>
            <p class="aq-heading-info">Published at <time datetime="">7:49 pm</time></p>
        </hgroup>

        <div class="aq-index" :style="{ color: range.get(airQuality)[1] }">
            <div class="aq-index-box1">
                <span class="aq-value">52</span>
                <span class="aq-desc">{{ range.get(airQuality)[0] }}</span>
            </div>
            <!-- <div class="aq-index-box2" style="color: black;">
                <h3 class="AirQuality--pollutantHeading--2KRps">Primary Pollutant:</h3>
                <p>PM2.5 (Particulate matter less than 2.5 microns)</p>
            </div> -->
        </div>

        <div class="aq-particles">
            <p class="aq-particles-dis">Air quality is good. A perfect day for a walk!</p>

            <div class="aq-pollutants-box">

                <h2 class="aq-pollutants-heading">All Pollutants</h2>

                <div class="aq-particles-box">
                    <div :style="{ background: range.get(airQuality)[1] }" :key="name" v-for="(value, name) in components">
                        <p class="aq-paritcles-value">{{ Number.parseFloat(value).toFixed(1) }}</p>
                        <p class="aq-paritcles-name">
                            {{ renderSub[name]['name'] }}
                            <sub>{{ renderSub[name].sub }}</sub>
                        </p>
                    </div>
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
    margin-block-end: .5rem;
    display: flex;
    align-items: flex-end;

}

/* .aq-index-box1 {
    flex: 1;
    border-inline-end: 1px solid #000;
}

.aq-index-box2 {
    flex: 1;
    font-size: 1.25rem;
    margin-inline-start: 1rem;
    align-self: baseline;
} */

.aq-index-box2>h3 {
    margin-block-end: .5rem;
}

.aq-index-box2>p {
    font-size: smaller;
}

.aq-value {
    font-size: clamp(1rem, 2rem + 4vw, 4rem);
    margin-inline-end: .75rem;
}

.aq-desc {
    font-size: clamp(1.015rem, 1rem + 5vw, 1.75rem);
}

/* 	Pollutant concentration */
/* .aq-particles {
    
} */

.aq-particles-dis {
    font-size: 1.25rem;
    margin-block-end: 1rem;
}

.aq-particles-box {
    display: flex;
    column-gap: 0.35rem;
    
    padding-block: .5rem;
    overflow-x: auto;
    scroll-snap-type: mandatory;

}

.aq-particles-box > div {
    font-size: 1.25rem;
    text-align: center;
    flex: 1;
    min-width: 80px;

    padding-inline: 0.5rem;
    padding-block: 0.25rem;
   
    color: #000000;
    border-radius: 3px;
}
/* .aq-particles-box > div::after { 
  content: url('../../media/examples/firefox-logo.svg');
  display: inline-block;
  width: 100%;
  height: .75rem;
  margin-right: 6px;
  background-color: green;
  
  border-radius: 6px;
} */

.aq-paritcles-value {
    margin-block-end: .25rem;
}

.aq-paritcles-name {
    font-size: smaller;
}

/* AQI Pollutants */
.aq-pollutants-box {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}


.aq-pollutants-heading {
    font-size: 1.95rem;
    font-weight: 500;
}



</style>