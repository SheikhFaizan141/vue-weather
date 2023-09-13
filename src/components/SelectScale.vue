<template>
    <div class="w-scale">
        <span class="w-scale-btn w-scale-celsius">°C</span>
        <span>|</span>
        <span class="w-scale-btn w-scale-fahrenheit">°F</span>
    </div>
</template>


<style scoped>
.w-scale {
    display: flex;
    column-gap: .25rem;
    font-size: 1.25rem;
    font-weight: 500;
    padding: .5rem;
    cursor: pointer;
    /* outline: 1px solid red; */
}

.w-scale-btn:hover {
    transform: scale(0.96);
    transition:
        transform 500ms ease-in-out;
    color: #4b4b4b;
}

.w-scale-active {
    color: darkblue;
}
</style>