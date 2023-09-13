<template>
    <div class="aqi-box">
        <h2>Air Quality Index</h2>
        <p>Published at <time datetime="">7:49 pm</time></p>
        <div class="aqi-reading">
            <span class="api-value">52</span>
            <span class="api-desc">Moderate</span>
        </div>
        <div class="aqi-particles">
            <p>Air quality is good. A perfect day for a walk!</p>
            <div class="aqi-particles-box">
                <p class="aqi-paritcles-value">37.17</p>
                <p class="aqi-paritcles-name">PM2.5</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.aqi-box {
    background: #fff;
    padding: .5rem;
    border-radius: 3px;
}

</style>