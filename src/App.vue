<script setup>
import { ref, watchEffect } from 'vue';
// import { RouterLink, RouterView } from 'vue-router'
import WeatherHeader from './components/WeatherHeader.vue';
import WeatherOverview from './components/WeatherOverview.vue';
import WeatherForecast from './components/WeatherForecast.vue';
import AirQuality from './components/AirQuality.vue';
import SearchBar from './components/SearchBar.vue';
import SelectScale from './components/SelectScale.vue';
import WeatherChart from './components/WeatherChart.vue';

const unit = ref(localStorage.getItem('unit') ?? 'c');
const weatherData = ref(null);
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
// Hourly Forecast
const hourly = ref();

async function fetchData(url, init = undefined) {
  const res = await fetch(url, init);

  if (!res.ok) {
    throw new Error('Network Error');
  }

  return await res.json();

}

function setWeather(data) {
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

  // Hourly Weather
  hourly.value = data['hourly'];
}

function setAddress(data) {
  const { country, name } = data[0];
  place.value = { country, name }
}

watchEffect(async () => {
  if (lat.value !== null && lon.value !== null) {
    const weather = fetchData(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat.value}&lon=${lon.value}&exclude=minutely&appid=d5cf16c9a343a988a0ba9ec47620dc88`);
    const location = fetchData(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat.value}&lon=${lon.value}&limit=1&appid=d5cf16c9a343a988a0ba9ec47620dc88`);

    try {
      const [weatherRes, locationRes] = await Promise.all([weather, location])
      setWeather(weatherRes);
      setAddress(locationRes);
    } catch (err) {
      console.error(err);
    }
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

      <div class="w-chart-box">
        <WeatherChart
          :tz-offset="dt_offset"
          :hourly-forecast="hourly"
          :unit="unit"
        />
      </div>

      <AirQuality
        :lat="lat"
        :lon="lon"
        :time-offset="dt_offset"
      />

    </template>
  </div>

  <!-- <RouterView /> -->
</template>

<style scoped>
.w-chart-box {
  background-color: aliceblue;
  padding: .75rem;
}
</style>
