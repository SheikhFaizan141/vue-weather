<script setup>
defineProps(['location'])
const days = []
function showDate() {
    let time = new Date();
    const options = {
        weekday: "long",
        hour: "numeric",
        minute: "numeric",
    };
            
    // console.log(day);
    return new Intl.DateTimeFormat("en-US", options).format(time);
}


</script>

<template>
    <header class="w-header">
        <nav class="nav">
            <div
                v-if="location"
                class="header-left"
            >
                <h1 class="w-h1">{{ location.name }}, {{ location.country }}</h1>
                <p class="w-time"><time datetime="">{{ showDate() }}</time></p>
            </div>
            <div
                class="header-right"
                :class="{ 'header-right-sb': !location }"
            >
                <slot name="search-bar"></slot>
                <slot name="select-scale"></slot>
            </div>
        </nav>
    </header>
</template>

<style scoped>
.w-header {
    background-color: #fff;
    border-radius: 3px;
}

.nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .5rem 1rem;
}

.header-left {
    flex: 1;

}

.header-left h1 {
    font-size: clamp(1rem, 5vw, 2.5rem);
    margin-bottom: .5rem;
}

.header-left>p {
    font-size: 1.15rem;
    margin-bottom: .5rem;
}

.header-right {
    display: flex;
    column-gap: .25rem;
    align-items: center;
}

.header-right-sb {
    flex: 1;
    justify-content: space-between;
}
</style>