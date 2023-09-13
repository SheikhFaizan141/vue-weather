<script setup>
import ExtraOverviewInfo from './ExtraOverviewInfo.vue';

const props = defineProps([
    'sunrise',
    'sunset',
    'timezone_offset',
    'temp',
    'feelsLike',
    'unit',
    'imgId',
    'weatherDis',
    'humidity',
    'windSpeed',
    'pressure',
    'uv',
]);

console.log(props.additionalInfo);

function formatDate(date) {
    let hours = date.getUTCHours();
    let minutes = date.getUTCMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    console.log(minutes);
    return strTime;
}

function formatUnit(temp) {
    const value = props.unit === 'c' ? temp - 273.15 : (1.8 * (temp - 273.15) + 32);
    console.log(value);
    return Math.round(value);
}

// const formatTime(new Date((time + offSet) * 1000))


</script>

<template>
    <div class="cw-box">
        <hgroup class="cw-text-box">
            <h2 class="cw-heading mb-1">Weather</h2>
            <p class="mb-1">What's the weather.</p>
        </hgroup>
        
        <div class="cw-sun">
            <div class="cw-sun-rise">
                <h3>Sunrise</h3>
                <span><time datetime="">{{ formatDate(new Date((sunrise + timezone_offset) * 1000)) }}</time></span>
            </div>
            <div class="cw-sun-set">
                <h3>Sunset</h3>
                <span><time datetime="">{{ formatDate(new Date((sunset + timezone_offset) * 1000)) }}</time></span>
            </div>
        </div>

        <div class="cw-info">
            <div class="cw-img-div">
                <img class="cw-img" width="100" height="100" :src="`https://openweathermap.org/img/wn/${imgId}@2x.png`"
                    alt="">
            </div>
            <div class="cw-temp-value">
                <p class="cw-temp-heading mb-1">{{ weatherDis }}</p>
                <div class="cw-temp-box">
                    <span class="cw-day-temp">{{ formatUnit(temp) }}°</span>
                    <sup> <span class="cw-night-temp">{{ formatUnit(feelsLike) }}°</span></sup>
                </div>
            </div>
        </div>


        <ExtraOverviewInfo 
        :humidity="humidity"
        :wind-speed="windSpeed"
        :pressure="pressure"
        :uv="uv"
        />
        <!-- <slot></slot> -->
    </div>
</template>

<style scoped>
.cw-box {
    background: #fff;
    padding: 0.75rem;
    display: grid;
    /* grid-template-areas:
        "Heading Heading SunRise"
        "OverView OverView Extra"; */
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
}

/* Heading Box */
.cw-heading {
    font-size: clamp(2rem, 1rem + 5vw, 4rem);
    font-weight: 500;
}

.cw-text-box {
    grid-column: 1/3;
}

.cw-text-box>p {
    font-size: 1.25rem;
}

/* .cw */

.cw-sun {
    display: flex;
    justify-content: space-between;
    align-items: center;
    grid-column: 3/4;
}

/* Weather info */
.cw-info {
    display: flex;
    column-gap: 1rem;
    grid-column: 1/3;
}

.cw-img {
    background-color: rgba(255, 166, 0, 0.75);
    border-radius: 4px;
    /* filter: drop-shadow(0 0 10px rgb(122, 165, 42)); */
    max-width: 100%;
    min-width: 80px;
    height: auto;
}

.cw-img-div {
    margin-inline-end: 0.75rem;
    /* background-color: #e7e7e7; */
    height: 100px;
}

.cw-temp-box {
    display: flex;
    /* vertical-align: baseline; */
    align-items: baseline;
    vertical-align: super;
}

.cw-temp-heading {
    font-size: 1.75rem;
    font-weight: 500;
    text-transform: capitalize;
}


.cw-day-temp {
    font-size: clamp(1rem, 2rem + 4vw, 4rem);
    margin-inline-end: .5rem;
}

.cw-night-temp {
    font-size: clamp(1rem, 2rem + 2vw, 2rem);

}

/* .cw-e */

/* Additional Slot Syle */
</style>