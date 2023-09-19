<script setup>
// import { RouterLink, RouterView } from 'vue-router'
import WeatherHeader from './components/WeatherHeader.vue';
import WeatherOverview from './components/WeatherOverview.vue';
import WeatherForecast from './components/WeatherForecast.vue';
import AirQuality from './components/AirQuality.vue';
import SearchBar from './components/SearchBar.vue';
import SelectScale from './components/SelectScale.vue';


import { onMounted, ref, watchEffect } from 'vue';
import { RouterView } from 'vue-router';
// import ExtraOverviewInfo from './components/ExtraOverviewInfo.vue';

const unit = ref(localStorage.getItem('unit') ?? 'c');
const searchText = ref('');


const weatherData = ref(null);
// const currentWeather = ref(null);
const lat = ref(localStorage.getItem('lat'));
const lon = ref(localStorage.getItem('lon'));
const place = ref(null);
const currentTemp = ref('');
const currentFleesLike = ref('');
const weatherDis = ref('');
const sunrise = ref('')
const sunset = ref('')
const dt_offset = ref(null)
const imgId = ref('');

// Other Addtional Box 
const humidity = ref('');
const windSpeed = ref('');
const pressure = ref('');
const uv = ref('');
// Weather Forecast
const forecast = ref('');




// async function fetchWeather() {

//   return data;
// }

async function getLocationName() {
  const res = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat.value}&lon=${lon.value}&limit=1&appid=d5cf16c9a343a988a0ba9ec47620dc88`)
  const data = await res.json();
  // place.value = { country, name } = data[0];
  const { country, name } = data[0];
  place.value = { country, name }
}

watchEffect(async () => {
  if (lat.value !== null && lon.value !== null) {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat.value}&lon=${lon.value}&exclude=minutely&appid=d5cf16c9a343a988a0ba9ec47620dc88`);

    const data = await res.json();
    weatherData.value = data;


    sunrise.value = data['current']['sunrise'];
    sunset.value = data['current']['sunset'];
    currentTemp.value = data['current']['temp'];
    currentFleesLike.value = data['current']['feels_like'];
    dt_offset.value = data['timezone_offset'];
    imgId.value = data['current']['weather'][0].icon;
    weatherDis.value = data['current']['weather'][0]['description'];

    // Additional Values
    humidity.value = data['current']['humidity'];
    windSpeed.value = data['current']['wind_speed'];
    pressure.value = data['current']['pressure'];
    uv.value = data['current']['uvi'];

    forecast.value = data['daily'];
    // console.log(data);
    getLocationName();
  }
})

function getGeoCoordinates() {
  navigator.geolocation.getCurrentPosition((position) => {
    lat.value = position.coords.latitude;
    lon.value = position.coords.longitude;

    localStorage.setItem('lat', position.coords.latitude);
    localStorage.setItem('lon', position.coords.longitude);
  });
}


function handleForecast(weather) {

  sunrise.value = weather['sunrise'];
  sunset.value = weather['sunset'];
  currentTemp.value = weather['temp']['day'];
  currentFleesLike.value = weather['temp']['night'];
  imgId.value = weather['weather'][0].icon;
  weatherDis.value = weather['weather'][0]['description'];

  // additional components
  humidity.value = weather['humidhumidityity'];
  windSpeed.value = weather['wind_speed'];
  pressure.value = weather['pressure'];
  uv.value = weather['uvi'];
}

function handleScaleClick(value) {
  if (value === 'c' && unit.value !== 'c') {
    unit.value = 'c';
  } else if (value === 'f' && unit.value !== 'f') {
    unit.value = 'f';
  }
}


function setLocation(resLat, resLon) {
  console.log(resLat, lat.value);
  lat.value = resLat;
  lon.value = resLon;


}

</script>




<template>
  <div class="container">
    <WeatherHeader v-if="!weatherData">
      <template #search-bar>
        <SearchBar @click-on-loc="getGeoCoordinates" />
      </template>

      <template #select-scale>
        <SelectScale
          @on-scale-click="handleScaleClick"
          :selected="unit"
        />

      </template>
    </WeatherHeader>

    <template v-else>
      <WeatherHeader :location="place">
        <template #search-bar>
          <SearchBar
            @click-on-loc="getGeoCoordinates"
            @location="setLocation"
          />
        </template>

        <template #select-scale>
          <SelectScale
            @on-scale-click="handleScaleClick"
            :selected="unit"
          />
        </template>
      </WeatherHeader>

      <WeatherOverview
        :timezone_offset="dt_offset"
        :sunrise="sunrise"
        :sunset="sunset"
        :temp="currentTemp"
        :feels-like="currentFleesLike"
        :scale="unit"
        :img-id="imgId"
        :weather-dis="weatherDis"
        :humidity="humidity"
        :wind-speed="windSpeed"
        :pressure="pressure"
        :uv="uv"
      />

    <WeatherForecast
      :scale="unit"
      :forecast="forecast"
      :time-offset="dt_offset"
      @on-click="handleForecast"
    />

    <AirQuality
      :lat="lat"
      :lon="lon"
    />

    <!-- <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d13218.866539167077!2d74.81561945!3d34.076777549999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1694682043392!5m2!1sen!2sin" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> -->
  </template>

</div>

<!-- <RouterView /> --></template>

<style scoped></style>
